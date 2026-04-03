import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Platform, Post, SocialAccount } from '@prisma/client';
import { createReadStream, existsSync } from 'fs';
import { google } from 'googleapis';
import { extname, resolve } from 'path';
import { Readable } from 'stream';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PublishScheduler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handlePublish() {
    console.log('Verificando posts para publicar...');

    const now = new Date();

    try {
      const posts = await this.prisma.post.findMany({
        where: {
          status: 'PENDING',
          scheduledAt: {
            lte: now,
          },
        },
      });

      for (const post of posts) {
        console.log(
          `🚀 Publicando post ${post.id} | Plataforma: ${post.platform}`,
        );

        try {
          const publishedVideoUrl = await this.publishToPlatform(post);

          await this.prisma.post.update({
            where: { id: post.id },
            data: {
              status: 'POSTED',
              postedAt: new Date(),
              videoUrl: publishedVideoUrl,
            },
          });
        } catch (publishError) {
          console.error(
            `Falha ao publicar post ${post.id} | Plataforma: ${post.platform}`,
            publishError,
          );

          await this.prisma.post.update({
            where: { id: post.id },
            data: {
              status: 'FAILED',
            },
          });
        }
      }

      console.log('Publicação finalizada');
    } catch (error) {
      console.error('Erro na publicação:', error);
    }
  }

  private async publishToPlatform(post: Post): Promise<string> {
    if (post.platform !== Platform.YOUTUBE) {
      throw new Error(`Somente YOUTUBE esta habilitado no momento`);
    }

    const socialAccount = await this.prisma.socialAccount.findFirst({
      where: {
        userId: post.userId,
        platform: post.platform,
      },
    });

    if (!socialAccount) {
      throw new Error(
        `Conta social nao encontrada para user ${post.userId} na plataforma ${post.platform}`,
      );
    }

    return this.publishToYoutube(post, socialAccount);
  }

  private async publishToYoutube(
    post: Post,
    socialAccount: SocialAccount,
  ): Promise<string> {
    if (!socialAccount.accessToken) {
      throw new Error('Access token do YouTube ausente');
    }

    // Quando o post já aponta para um vídeo YouTube, trata como conteúdo já publicado.
    if (post.videoUrl && this.isYoutubeUrl(post.videoUrl)) {
      return post.videoUrl;
    }

    const clientID = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');

    if (!clientID || !clientSecret) {
      throw new Error('GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET nao configurados');
    }

    const oauth2Client = new google.auth.OAuth2(clientID, clientSecret);
    oauth2Client.setCredentials({
      access_token: socialAccount.accessToken,
      refresh_token: socialAccount.refreshToken ?? undefined,
      expiry_date: socialAccount.tokenExpiry?.getTime(),
    });

    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client,
    });

    const media = await this.getMediaFromPost(post);
    const privacyStatus = this.getYoutubePrivacyStatus();

    const response = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: post.title,
          description: post.description ?? '',
        },
        status: {
          privacyStatus,
        },
      },
      media: {
        mimeType: media.mimeType,
        body: media.stream,
      },
    });

    await this.persistLatestGoogleTokens(socialAccount, oauth2Client);

    const uploadedVideoId = response.data.id;

    if (!uploadedVideoId) {
      throw new Error('A API do YouTube nao retornou o id do video publicado');
    }

    return `https://www.youtube.com/watch?v=${uploadedVideoId}`;
  }

  private getYoutubePrivacyStatus(): 'private' | 'unlisted' | 'public' {
    const rawValue = this.configService
      .get<string>('YOUTUBE_DEFAULT_PRIVACY_STATUS')
      ?.toLowerCase();

    if (rawValue === 'public' || rawValue === 'private') {
      return rawValue;
    }

    return 'unlisted';
  }

  private async getMediaFromPost(post: Post): Promise<{
    stream: Readable;
    mimeType: string;
  }> {
    if (!post.videoUrl) {
      throw new Error(
        `Post ${post.id} sem videoUrl. Defina um arquivo local (path) ou URL de mídia para upload.`,
      );
    }

    if (this.isHttpUrl(post.videoUrl)) {
      const response = await fetch(post.videoUrl);

      if (!response.ok || !response.body) {
        throw new Error(
          `Falha ao baixar mídia para upload (${response.status})`,
        );
      }

      const mimeType =
        response.headers.get('content-type') ??
        this.resolveMimeType(post.videoUrl);

      const mediaBuffer = Buffer.from(await response.arrayBuffer());

      return {
        stream: Readable.from(mediaBuffer),
        mimeType,
      };
    }

    const absolutePath = resolve(post.videoUrl);

    if (!existsSync(absolutePath)) {
      throw new Error(`Arquivo de vídeo nao encontrado: ${absolutePath}`);
    }

    return {
      stream: createReadStream(absolutePath),
      mimeType: this.resolveMimeType(absolutePath),
    };
  }

  private resolveMimeType(pathOrUrl: string): string {
    const extension = extname(pathOrUrl).toLowerCase();

    if (extension === '.mp4') return 'video/mp4';
    if (extension === '.mov') return 'video/quicktime';
    if (extension === '.webm') return 'video/webm';
    if (extension === '.mkv') return 'video/x-matroska';

    return 'video/*';
  }

  private async persistLatestGoogleTokens(
    socialAccount: SocialAccount,
    oauth2Client: InstanceType<typeof google.auth.OAuth2>,
  ): Promise<void> {
    const credentials = oauth2Client.credentials;

    if (
      !credentials.access_token &&
      !credentials.refresh_token &&
      !credentials.expiry_date
    ) {
      return;
    }

    await this.prisma.socialAccount.update({
      where: { id: socialAccount.id },
      data: {
        accessToken: credentials.access_token ?? socialAccount.accessToken,
        refreshToken: credentials.refresh_token ?? socialAccount.refreshToken,
        tokenExpiry: credentials.expiry_date
          ? new Date(credentials.expiry_date)
          : socialAccount.tokenExpiry,
      },
    });
  }

  private isYoutubeUrl(value: string): boolean {
    try {
      const parsed = new URL(value);
      return (
        parsed.hostname.includes('youtube.com') ||
        parsed.hostname.includes('youtu.be')
      );
    } catch {
      return false;
    }
  }

  private isHttpUrl(value: string): boolean {
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }
}
