import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAutoPosts(userId: string, nicheId: string) {
    const now = new Date();

    const posts: Post[] = [];

    for (let i = 0; i < 3; i++) {
      const scheduledDate = new Date(now);

      // espaça os posts (ex: 9h, 13h, 17h)
      scheduledDate.setHours(9 + i * 4, 0, 0);

      const post = await this.prisma.post.create({
        data: {
          title: `Corte automático #${i + 1}`,
          description: 'Post gerado automaticamente',
          platform: 'TIKTOK',
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

    return posts;
  }
}
