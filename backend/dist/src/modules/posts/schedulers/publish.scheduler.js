"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishScheduler = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const googleapis_1 = require("googleapis");
const path_1 = require("path");
const stream_1 = require("stream");
const prisma_service_1 = require("../../../database/prisma.service");
let PublishScheduler = class PublishScheduler {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async handlePublish() {
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
                console.log(`🚀 Publicando post ${post.id} | Plataforma: ${post.platform}`);
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
                }
                catch (publishError) {
                    const failureReason = this.getErrorMessage(publishError);
                    console.error(`Falha ao publicar post ${post.id} | Plataforma: ${post.platform}`, publishError);
                    await this.prisma.post.update({
                        where: { id: post.id },
                        data: {
                            status: 'FAILED',
                            description: this.buildFailedDescription(post.description, failureReason),
                        },
                    });
                }
            }
            await this.syncYoutubeAnalyticsSnapshots();
        }
        catch (error) {
            console.error('Erro na publicação:', error);
        }
    }
    async syncYoutubeAnalyticsSnapshots() {
        const postedYoutubePosts = await this.prisma.post.findMany({
            where: {
                status: 'POSTED',
                platform: client_1.Platform.YOUTUBE,
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
                platform: client_1.Platform.YOUTUBE,
                userId: {
                    in: [...new Set(postedYoutubePosts.map((post) => post.userId))],
                },
            },
        });
        const accountByUserId = new Map(socialAccounts.map((account) => [account.userId, account]));
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
                const statistics = await this.fetchYoutubeVideoStatistics(videoId, socialAccount);
                await this.prisma.postAnalytics.create({
                    data: {
                        postId: post.id,
                        views: statistics.views,
                        likes: statistics.likes,
                        comments: statistics.comments,
                    },
                });
            }
            catch (error) {
                const authIssue = this.getYoutubeAuthIssue(error);
                if (authIssue === 'insufficient-scope') {
                    console.warn(`Analytics do YouTube sem escopo para o post ${post.id}. Reconecte a conta no fluxo Google para conceder youtube.readonly.`);
                    continue;
                }
                if (authIssue === 'invalid-credentials') {
                    console.warn(`Token do YouTube invalido/expirado para o post ${post.id}. Reconecte a conta no fluxo Google.`);
                    continue;
                }
                const errorMessage = this.getErrorMessage(error);
                console.error(`Falha ao sincronizar analytics do post ${post.id}: ${errorMessage}`);
            }
        }
    }
    async fetchYoutubeVideoStatistics(videoId, socialAccount) {
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
    buildYoutubeClient(socialAccount) {
        if (!socialAccount.accessToken) {
            throw new Error('Access token do YouTube ausente');
        }
        const clientID = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
        if (!clientID || !clientSecret) {
            throw new Error('GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET nao configurados');
        }
        const oauth2Client = new googleapis_1.google.auth.OAuth2(clientID, clientSecret);
        oauth2Client.setCredentials({
            access_token: socialAccount.accessToken,
            refresh_token: socialAccount.refreshToken ?? undefined,
            expiry_date: socialAccount.tokenExpiry?.getTime(),
        });
        return {
            youtube: googleapis_1.google.youtube({
                version: 'v3',
                auth: oauth2Client,
            }),
            oauth2Client,
        };
    }
    async attachQueueVideosToPendingPosts() {
        const pendingPostsWithoutVideo = await this.prisma.post.findMany({
            where: {
                platform: client_1.Platform.YOUTUBE,
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
        if (!(0, fs_1.existsSync)(queueDir)) {
            return;
        }
        await (0, promises_1.mkdir)(processingDir, { recursive: true });
        const queueFiles = await (0, promises_1.readdir)(queueDir);
        const videos = queueFiles
            .filter((fileName) => this.isVideoFile(fileName))
            .sort((a, b) => a.localeCompare(b));
        const assignCount = Math.min(pendingPostsWithoutVideo.length, videos.length);
        for (let index = 0; index < assignCount; index += 1) {
            const post = pendingPostsWithoutVideo[index];
            const videoName = videos[index];
            if (!post || !videoName) {
                continue;
            }
            const sourcePath = (0, path_1.resolve)(queueDir, videoName);
            const extension = (0, path_1.extname)(videoName);
            const targetPath = (0, path_1.resolve)(processingDir, `${post.id}${extension}`);
            await (0, promises_1.rename)(sourcePath, targetPath);
            await this.prisma.post.update({
                where: {
                    id: post.id,
                },
                data: {
                    videoUrl: targetPath,
                },
            });
            console.log(`📦 Video ${videoName} vinculado ao post ${post.id} para publicacao automatica`);
        }
    }
    async publishToPlatform(post) {
        if (post.platform !== client_1.Platform.YOUTUBE) {
            throw new Error(`Somente YOUTUBE esta habilitado no momento`);
        }
        const socialAccount = await this.prisma.socialAccount.findFirst({
            where: {
                userId: post.userId,
                platform: post.platform,
            },
        });
        if (!socialAccount) {
            throw new Error(`Conta social nao encontrada para user ${post.userId} na plataforma ${post.platform}`);
        }
        return this.publishToYoutube(post, socialAccount);
    }
    async publishToYoutube(post, socialAccount) {
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
    getYoutubePrivacyStatus() {
        const rawValue = this.configService
            .get('YOUTUBE_DEFAULT_PRIVACY_STATUS')
            ?.toLowerCase();
        if (rawValue === 'public' ||
            rawValue === 'private' ||
            rawValue === 'unlisted') {
            return rawValue;
        }
        return 'public';
    }
    async getMediaFromPost(post) {
        if (!post.videoUrl) {
            throw new Error(`Post ${post.id} sem videoUrl. Defina um arquivo local (path) ou URL de mídia para upload.`);
        }
        if (this.isHttpUrl(post.videoUrl)) {
            const response = await fetch(post.videoUrl);
            if (!response.ok || !response.body) {
                throw new Error(`Falha ao baixar mídia para upload (${response.status})`);
            }
            const mimeType = response.headers.get('content-type') ??
                this.resolveMimeType(post.videoUrl);
            const mediaBuffer = Buffer.from(await response.arrayBuffer());
            return {
                stream: stream_1.Readable.from(mediaBuffer),
                mimeType,
            };
        }
        const absolutePath = (0, path_1.resolve)(post.videoUrl);
        if (!(0, fs_1.existsSync)(absolutePath)) {
            throw new Error(`Arquivo de vídeo nao encontrado: ${absolutePath}`);
        }
        return {
            stream: (0, fs_1.createReadStream)(absolutePath),
            mimeType: this.resolveMimeType(absolutePath),
        };
    }
    resolveMimeType(pathOrUrl) {
        const extension = (0, path_1.extname)(pathOrUrl).toLowerCase();
        if (extension === '.mp4')
            return 'video/mp4';
        if (extension === '.mov')
            return 'video/quicktime';
        if (extension === '.webm')
            return 'video/webm';
        if (extension === '.mkv')
            return 'video/x-matroska';
        return 'video/*';
    }
    async persistLatestGoogleTokens(socialAccount, oauth2Client) {
        const credentials = oauth2Client.credentials;
        if (!credentials.access_token &&
            !credentials.refresh_token &&
            !credentials.expiry_date) {
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
    async archiveLocalVideoIfNeeded(sourceVideoPath) {
        if (!sourceVideoPath || this.isHttpUrl(sourceVideoPath)) {
            return;
        }
        const absolutePath = (0, path_1.resolve)(sourceVideoPath);
        if (!(0, fs_1.existsSync)(absolutePath)) {
            return;
        }
        const publishedDir = this.getPublishedDir();
        await (0, promises_1.mkdir)(publishedDir, { recursive: true });
        const archivedPath = (0, path_1.resolve)(publishedDir, (0, path_1.basename)(absolutePath));
        await (0, promises_1.rename)(absolutePath, archivedPath);
    }
    isYoutubeUrl(value) {
        try {
            const parsed = new URL(value);
            return (parsed.hostname.includes('youtube.com') ||
                parsed.hostname.includes('youtu.be'));
        }
        catch {
            return false;
        }
    }
    extractYouTubeVideoId(url) {
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
                const shortsIndex = pathSegments.findIndex((segment) => segment.toLowerCase().includes('shorts'));
                const shortsVideoId = pathSegments[shortsIndex + 1];
                if (shortsIndex >= 0 &&
                    typeof shortsVideoId === 'string' &&
                    shortsVideoId.length >= 6) {
                    return shortsVideoId;
                }
            }
            return null;
        }
        catch {
            return null;
        }
    }
    isHttpUrl(value) {
        try {
            const parsed = new URL(value);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        }
        catch {
            return false;
        }
    }
    isVideoFile(fileName) {
        const extension = (0, path_1.extname)(fileName).toLowerCase();
        return ['.mp4', '.mov', '.webm', '.mkv'].includes(extension);
    }
    getErrorMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === 'string') {
            return error;
        }
        return 'Erro desconhecido durante publicação';
    }
    getYoutubeAuthIssue(error) {
        if (!error || typeof error !== 'object') {
            return null;
        }
        const candidate = error;
        const message = [candidate.message, candidate.cause?.message]
            .filter((value) => typeof value === 'string')
            .join(' ')
            .toLowerCase()
            .trim();
        if (candidate.status === 401 ||
            message.includes('invalid authentication credentials') ||
            message.includes('unauthenticated')) {
            return 'invalid-credentials';
        }
        if (candidate.status === 403 &&
            (message.includes('insufficient authentication scopes') ||
                message.includes('permission_denied'))) {
            return 'insufficient-scope';
        }
        return null;
    }
    buildFailedDescription(originalDescription, reason) {
        const base = originalDescription?.trim() || 'Post sem descricao';
        const normalizedReason = reason.trim() || 'Erro desconhecido';
        return `${base}\n\n[FAILED_REASON] ${normalizedReason}`;
    }
    getQueueDir() {
        return (0, path_1.resolve)(this.configService.get('LOCAL_VIDEO_QUEUE_DIR') ??
            'uploads/queue');
    }
    getProcessingDir() {
        return (0, path_1.resolve)(this.configService.get('LOCAL_VIDEO_PROCESSING_DIR') ??
            'uploads/processing');
    }
    getPublishedDir() {
        return (0, path_1.resolve)(this.configService.get('LOCAL_VIDEO_PUBLISHED_DIR') ??
            'uploads/published');
    }
};
exports.PublishScheduler = PublishScheduler;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublishScheduler.prototype, "handlePublish", null);
exports.PublishScheduler = PublishScheduler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], PublishScheduler);
//# sourceMappingURL=publish.scheduler.js.map