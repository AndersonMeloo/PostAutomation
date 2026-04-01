import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Post } from '@prisma/client';
import { ImportYoutubePostDto } from './dto/import-youtube-post.dto';

type UserWithNiches = {
  id: string;
  niches: {
    id: string;
    name: string;
    description: string | null;
    active: boolean;
  }[];
};

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPostFromYoutubeUrl(data: ImportYoutubePostDto) {
    const [user, niche, youtubeAccount] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: data.userId },
        select: { id: true },
      }),
      this.prisma.niche.findUnique({
        where: { id: data.nicheId },
        select: { id: true, active: true },
      }),
      this.prisma.socialAccount.findFirst({
        where: {
          userId: data.userId,
          platform: 'YOUTUBE',
        },
        select: { id: true },
      }),
    ]);

    if (!user) {
      throw new NotFoundException(`Usuario ${data.userId} nao encontrado`);
    }

    if (!niche || !niche.active) {
      throw new BadRequestException('Nicho nao encontrado ou inativo');
    }

    if (!youtubeAccount) {
      throw new BadRequestException(
        'Conta YouTube nao conectada para este usuario',
      );
    }

    const videoId = this.extractYouTubeVideoId(data.youtubeUrl);

    if (!videoId) {
      throw new BadRequestException('URL do YouTube invalida');
    }

    const scheduledAt = new Date(data.scheduledAt);

    if (Number.isNaN(scheduledAt.getTime())) {
      throw new BadRequestException('scheduledAt invalido');
    }

    const metadata = await this.fetchYoutubeMetadata(data.youtubeUrl);
    const title =
      metadata?.title ?? `Video do YouTube importado | ${videoId.slice(0, 8)}`;
    const description =
      metadata?.description ?? `Importado de ${data.youtubeUrl}`;

    return this.prisma.post.create({
      data: {
        title,
        description,
        videoUrl: data.youtubeUrl,
        platform: 'YOUTUBE',
        status: 'PENDING',
        scheduledAt,
        niche: {
          connect: { id: data.nicheId },
        },
        user: {
          connect: { id: data.userId },
        },
      },
    });
  }

  // Buscar usuários com nichos (VIA POSTS)
  async getUsersWithNiches(): Promise<UserWithNiches[]> {
    const [activeNiches, usersWithYoutube] = await Promise.all([
      this.prisma.niche.findMany({
        where: { active: true },
        select: {
          id: true,
          name: true,
          description: true,
          active: true,
        },
      }),
      this.prisma.user.findMany({
        where: {
          socialAccounts: {
            some: {
              platform: 'YOUTUBE',
            },
          },
        },
        select: {
          id: true,
        },
      }),
    ]);

    return usersWithYoutube.map((user): UserWithNiches => {
      return {
        id: user.id,
        niches: activeNiches,
      };
    });
  }

  // Criar posts automáticos (SEM DUPLICAR + MULTI-PLATAFORMA)
  async createAutoPosts(userId: string, nicheId: string) {
    const now = new Date();

    const niche = await this.prisma.niche.findUnique({
      where: { id: nicheId },
      select: {
        id: true,
        name: true,
        description: true,
        active: true,
      },
    });

    if (!niche || !niche.active) {
      return [];
    }

    // Evitar duplicação usando scheduledAt
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existingPosts = await this.prisma.post.count({
      where: {
        userId,
        nicheId,
        scheduledAt: {
          gte: startOfDay,
        },
      },
    });

    // 3 posts = 3 horários x 1 plataforma (YouTube)
    if (existingPosts >= 3) {
      console.log(
        `⚠️ Já existem ${existingPosts} posts hoje para user ${userId} e niche ${nicheId}`,
      );
      return [];
    }

    const posts: Post[] = [];

    const platforms = ['YOUTUBE'] as const;

    // Cálculo correto baseado nas plataformas
    const startIndex = Math.floor(existingPosts / platforms.length);

    for (let i = startIndex; i < 3; i++) {
      const scheduledDate = new Date(now);

      // Horários: 9h, 13h, 17h
      // scheduledDate.setHours(9 + i * 4, 0, 0, 0);

      // TESTE DOS POSTS A CADA MINUTO
      scheduledDate.setMinutes(now.getMinutes() + 1 + i);

      for (const platform of platforms) {
        const post = await this.prisma.post.create({
          data: {
            title: `${niche.name} | Conteudo automatico #${i + 1}`,
            description:
              niche.description ?? `Post automatico para o nicho ${niche.name}`,
            platform,
            status: 'PENDING',
            scheduledAt: scheduledDate,
            niche: {
              connect: { id: nicheId },
            },
            user: {
              connect: { id: userId },
            },
          },
        });

        posts.push(post);
      }
    }

    return posts;
  }

  private extractYouTubeVideoId(url: string): string | null {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes('youtu.be')) {
        const value = parsed.pathname.replace('/', '').trim();
        return value || null;
      }

      if (parsed.hostname.includes('youtube.com')) {
        const v = parsed.searchParams.get('v');
        if (v) return v;

        const shorts = parsed.pathname.match(/^\/shorts\/([^/?]+)/);
        if (shorts?.[1]) return shorts[1];

        const embed = parsed.pathname.match(/^\/embed\/([^/?]+)/);
        if (embed?.[1]) return embed[1];
      }

      return null;
    } catch {
      return null;
    }
  }

  private async fetchYoutubeMetadata(url: string): Promise<{
    title?: string;
    description?: string;
  } | null> {
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const response = await fetch(oembedUrl);

      if (!response.ok) return null;

      const payload = (await response.json()) as { title?: string };

      return {
        title: payload.title,
      };
    } catch {
      return null;
    }
  }
}
