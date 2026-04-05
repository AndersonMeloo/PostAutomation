import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Platform, Post, SocialAccount } from '@prisma/client';
import { createReadStream, existsSync } from 'fs';
import { mkdir, readdir, rename } from 'fs/promises';
import { google } from 'googleapis';
import { basename, extname, resolve } from 'path';
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
      await this.attachQueueVideosToPendingPosts();

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
          const sourceVideoPath = post.videoUrl;
          const publishedVideoUrl = await this.publishToPlatform(post);

          await this.prisma.post.update({
            where: { id: post.id },
            data: {
              status: 'POSTED',
              postedAt: new Date(),
              videoUrl: publishedVideoUrl,
            },
          });

          await this.archiveLocalVideoIfNeeded(sourceVideoPath);
        } catch (publishError) {
          const failureReason = this.getErrorMessage(publishError);

          console.error(
            `Falha ao publicar post ${post.id} | Plataforma: ${post.platform}`,
            publishError,
          );

          await this.prisma.post.update({
            where: { id: post.id },
            data: {
              status: 'FAILED',
              description: this.buildFailedDescription(
                post.description,
                failureReason,
              ),
            },
          });
        }
      }

      console.log('Publicação finalizada');
    } catch (error) {
      console.error('Erro na publicação:', error);
    }
  }

  private async attachQueueVideosToPendingPosts(): Promise<void> {
    const pendingPostsWithoutVideo = await this.prisma.post.findMany({
      where: {
        platform: Platform.YOUTUBE,
        status: 'PENDING',
        videoUrl: null,
      },
      orderBy: [
        {
          scheduledAt: 'asc',
        },
        {
          id: 'asc',
        },
      ],
      select: {
        id: true,
      },
    });

    if (pendingPostsWithoutVideo.length === 0) {
      return;
    }

    const queueDir = this.getQueueDir();
    const processingDir = this.getProcessingDir();

    if (!existsSync(queueDir)) {
      return;
    }

    await mkdir(processingDir, { recursive: true });

    const queueFiles = await readdir(queueDir);
    const videos = queueFiles
      .filter((fileName) => this.isVideoFile(fileName))
      .sort((a, b) => a.localeCompare(b));

    const assignCount = Math.min(
      pendingPostsWithoutVideo.length,
      videos.length,
    );

    for (let index = 0; index < assignCount; index += 1) {
      const post = pendingPostsWithoutVideo[index];
      const videoName = videos[index];

      if (!post || !videoName) {
        continue;
      }

      const sourcePath = resolve(queueDir, videoName);
      const extension = extname(videoName);
      const targetPath = resolve(processingDir, `${post.id}${extension}`);

      await rename(sourcePath, targetPath);

      await this.prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          videoUrl: targetPath,
        },
      });

      console.log(
        `📦 Video ${videoName} vinculado ao post ${post.id} para publicacao automatica`,
      );
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

    if (
      rawValue === 'public' ||
      rawValue === 'private' ||
      rawValue === 'unlisted'
    ) {
      return rawValue;
    }

    // Por padrao, publicar como publico quando a variavel nao estiver definida.
    return 'public';
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

  private async archiveLocalVideoIfNeeded(
    sourceVideoPath: string | null,
  ): Promise<void> {
    if (!sourceVideoPath || this.isHttpUrl(sourceVideoPath)) {
      return;
    }

    const absolutePath = resolve(sourceVideoPath);

    if (!existsSync(absolutePath)) {
      return;
    }

    const publishedDir = this.getPublishedDir();
    await mkdir(publishedDir, { recursive: true });

    const archivedPath = resolve(publishedDir, basename(absolutePath));
    await rename(absolutePath, archivedPath);
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

  private isVideoFile(fileName: string): boolean {
    const extension = extname(fileName).toLowerCase();
    return ['.mp4', '.mov', '.webm', '.mkv'].includes(extension);
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    return 'Erro desconhecido durante publicação';
  }

  private buildFailedDescription(
    originalDescription: string | null,
    reason: string,
  ): string {
    const base = originalDescription?.trim() || 'Post sem descricao';
    const normalizedReason = reason.trim() || 'Erro desconhecido';
    return `${base}\n\n[FAILED_REASON] ${normalizedReason}`;
  }

  private getQueueDir(): string {
    return resolve(
      this.configService.get<string>('LOCAL_VIDEO_QUEUE_DIR') ??
        'uploads/queue',
    );
  }

  private getProcessingDir(): string {
    return resolve(
      this.configService.get<string>('LOCAL_VIDEO_PROCESSING_DIR') ??
        'uploads/processing',
    );
  }

  private getPublishedDir(): string {
    return resolve(
      this.configService.get<string>('LOCAL_VIDEO_PUBLISHED_DIR') ??
        'uploads/published',
    );
  }
}
