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
    // console.log('Verificando posts para publicar...');

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

      await this.syncYoutubeAnalyticsSnapshots();

      // console.log('Publicação finalizada');
    } catch (error) {
      console.error('Erro na publicação:', error);
    }
  }

  private async syncYoutubeAnalyticsSnapshots(): Promise<void> {
    const postedYoutubePosts = await this.prisma.post.findMany({
      where: {
        status: 'POSTED',
        platform: Platform.YOUTUBE,
        videoUrl: {
          not: null,
        },
      },
      select: {
        id: true,
        userId: true,
        videoUrl: true,
      },
      take: 100,
      orderBy: {
        postedAt: 'desc',
      },
    });

    if (postedYoutubePosts.length === 0) {
      return;
    }

    const socialAccounts = await this.prisma.socialAccount.findMany({
      where: {
        platform: Platform.YOUTUBE,
        userId: {
          in: [...new Set(postedYoutubePosts.map((post) => post.userId))],
        },
      },
    });

    const accountByUserId = new Map<string, SocialAccount>(
      socialAccounts.map((account) => [account.userId, account]),
    );

    for (const post of postedYoutubePosts) {
      const socialAccount = accountByUserId.get(post.userId);

      if (!socialAccount || !post.videoUrl) {
        continue;
      }

      const videoId = this.extractYouTubeVideoId(post.videoUrl);

      if (!videoId) {
        continue;
      }

      try {
        const statistics = await this.fetchYoutubeVideoStatistics(
          videoId,
          socialAccount,
        );

        await this.prisma.postAnalytics.create({
          data: {
            postId: post.id,
            views: statistics.views,
            likes: statistics.likes,
            comments: statistics.comments,
          },
        });
      } catch (error) {
        const authIssue = this.getYoutubeAuthIssue(error);

        if (authIssue === 'insufficient-scope') {
          console.warn(
            `Analytics do YouTube sem escopo para o post ${post.id}. Reconecte a conta no fluxo Google para conceder youtube.readonly.`,
          );
          continue;
        }

        if (authIssue === 'invalid-credentials') {
          console.warn(
            `Token do YouTube invalido/expirado para o post ${post.id}. Reconecte a conta no fluxo Google.`,
          );
          continue;
        }

        const errorMessage = this.getErrorMessage(error);
        console.error(
          `Falha ao sincronizar analytics do post ${post.id}: ${errorMessage}`,
        );
      }
    }
  }

  private async fetchYoutubeVideoStatistics(
    videoId: string,
    socialAccount: SocialAccount,
  ): Promise<{ views: number; likes: number; comments: number }> {
    const { youtube, oauth2Client } = this.buildYoutubeClient(socialAccount);

    const response = await youtube.videos.list({
      part: ['statistics'],
      id: [videoId],
    });

    await this.persistLatestGoogleTokens(socialAccount, oauth2Client);

    const statistics = response.data.items?.[0]?.statistics;

    return {
      views: Number(statistics?.viewCount ?? 0),
      likes: Number(statistics?.likeCount ?? 0),
      comments: Number(statistics?.commentCount ?? 0),
    };
  }

  private buildYoutubeClient(socialAccount: SocialAccount): {
    youtube: ReturnType<typeof google.youtube>;
    oauth2Client: InstanceType<typeof google.auth.OAuth2>;
  } {
    if (!socialAccount.accessToken) {
      throw new Error('Access token do YouTube ausente');
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

    return {
      youtube: google.youtube({
        version: 'v3',
        auth: oauth2Client,
      }),
      oauth2Client,
    };
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
    // Quando o post já aponta para um vídeo YouTube, trata como conteúdo já publicado.
    if (post.videoUrl && this.isYoutubeUrl(post.videoUrl)) {
      return post.videoUrl;
    }

    const { youtube, oauth2Client } = this.buildYoutubeClient(socialAccount);

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

  private extractYouTubeVideoId(url: string): string | null {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();

      if (host.includes('youtu.be')) {
        const shortId = parsed.pathname.split('/').filter(Boolean)[0];
        return shortId && shortId.length >= 6 ? shortId : null;
      }

      if (host.includes('youtube.com')) {
        const watchId = parsed.searchParams.get('v');
        if (watchId && watchId.length >= 6) {
          return watchId;
        }

        const pathSegments = parsed.pathname.split('/').filter(Boolean);
        const shortsIndex = pathSegments.findIndex((segment) =>
          segment.toLowerCase().includes('shorts'),
        );
        const shortsVideoId = pathSegments[shortsIndex + 1];

        if (
          shortsIndex >= 0 &&
          typeof shortsVideoId === 'string' &&
          shortsVideoId.length >= 6
        ) {
          return shortsVideoId;
        }
      }

      return null;
    } catch {
      return null;
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

  private getYoutubeAuthIssue(
    error: unknown,
  ): 'invalid-credentials' | 'insufficient-scope' | null {
    if (!error || typeof error !== 'object') {
      return null;
    }

    const candidate = error as {
      status?: number;
      cause?: { message?: string };
      message?: string;
    };

    const message = [candidate.message, candidate.cause?.message]
      .filter((value): value is string => typeof value === 'string')
      .join(' ')
      .toLowerCase()
      .trim();

    if (
      candidate.status === 401 ||
      message.includes('invalid authentication credentials') ||
      message.includes('unauthenticated')
    ) {
      return 'invalid-credentials';
    }

    if (
      candidate.status === 403 &&
      (message.includes('insufficient authentication scopes') ||
        message.includes('permission_denied'))
    ) {
      return 'insufficient-scope';
    }

    return null;
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
