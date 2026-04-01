import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Post } from '@prisma/client';

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

  // Buscar usuários com nichos (VIA POSTS)
  async getUsersWithNiches(): Promise<UserWithNiches[]> {
    const users = await this.prisma.user.findMany({
      include: {
        posts: {
          include: {
            niche: true,
          },
        },
      },
    });

    return users.map((user): UserWithNiches => {
      const nichesMap = new Map<string, UserWithNiches['niches'][number]>();

      user.posts.forEach((post) => {
        if (post.niche) {
          nichesMap.set(post.niche.id, post.niche);
        }
      });

      return {
        id: user.id,
        niches: Array.from(nichesMap.values()),
      };
    });
  }

  // Criar posts automáticos (SEM DUPLICAR + MULTI-PLATAFORMA)
  async createAutoPosts(userId: string, nicheId: string) {
    const now = new Date();

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

    // 6 posts = 3 horários × 2 plataformas
    if (existingPosts >= 6) {
      console.log(
        `⚠️ Já existem ${existingPosts} posts hoje para user ${userId} e niche ${nicheId}`,
      );
      return [];
    }

    const posts: Post[] = [];

    const platforms = ['TIKTOK', 'YOUTUBE'] as const;

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
            title: `Corte automático #${i + 1}`,
            description: `Post para ${platform}`,
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
}
