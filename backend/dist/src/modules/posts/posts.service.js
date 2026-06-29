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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../database/prisma.service");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const path_1 = require("path");
let PostsService = class PostsService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    getLocalDateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    isUploadVideoFile(file) {
        if (!file || typeof file !== 'object') {
            return false;
        }
        const candidate = file;
        return (typeof candidate.originalname === 'string' &&
            candidate.originalname.length > 0 &&
            Buffer.isBuffer(candidate.buffer));
    }
    isVideoFile(fileName) {
        const extension = (0, path_1.extname)(fileName).toLowerCase();
        return ['.mp4', '.mov', '.webm', '.mkv'].includes(extension);
    }
    async listPosts(userId) {
        return this.prisma.post.findMany({
            where: {
                userId,
            },
            orderBy: [
                {
                    postedAt: 'desc',
                },
                {
                    scheduledAt: 'desc',
                },
            ],
            include: {
                niche: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                analytics: {
                    orderBy: {
                        collectedAt: 'desc',
                    },
                    take: 1,
                },
            },
            take: 50,
        });
    }
    async getPostsOverviewByDate(userId, inputDate) {
        const targetDate = inputDate ? new Date(inputDate) : new Date();
        if (Number.isNaN(targetDate.getTime())) {
            throw new common_1.BadRequestException('Data invalida. Use YYYY-MM-DD.');
        }
        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);
        const [postedTodayPosts, postedVideos, analyticsSnapshots] = await Promise.all([
            this.prisma.post.findMany({
                where: {
                    userId,
                    status: 'POSTED',
                    postedAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
                orderBy: {
                    postedAt: 'desc',
                },
                select: {
                    id: true,
                    title: true,
                    videoUrl: true,
                    platform: true,
                    status: true,
                    postedAt: true,
                    scheduledAt: true,
                    analytics: {
                        orderBy: {
                            collectedAt: 'desc',
                        },
                        take: 1,
                        select: {
                            views: true,
                            likes: true,
                            comments: true,
                            collectedAt: true,
                        },
                    },
                },
            }),
            this.prisma.post.findMany({
                where: {
                    userId,
                    status: 'POSTED',
                },
                select: {
                    analytics: {
                        orderBy: {
                            collectedAt: 'desc',
                        },
                        take: 1,
                        select: {
                            views: true,
                            likes: true,
                            comments: true,
                        },
                    },
                },
            }),
            this.prisma.postAnalytics.findMany({
                where: {
                    post: {
                        userId,
                    },
                },
                select: {
                    postId: true,
                    views: true,
                    likes: true,
                    comments: true,
                    collectedAt: true,
                },
                orderBy: {
                    collectedAt: 'asc',
                },
            }),
        ]);
        const latestSnapshotByPostAndDay = new Map();
        for (const snapshot of analyticsSnapshots) {
            const date = this.getLocalDateKey(snapshot.collectedAt);
            const key = `${snapshot.postId}:${date}`;
            latestSnapshotByPostAndDay.set(key, {
                date,
                views: snapshot.views,
                likes: snapshot.likes,
                comments: snapshot.comments,
                collectedAt: snapshot.collectedAt,
            });
        }
        const dailySnapshotsByPost = new Map();
        for (const [key, snapshot] of latestSnapshotByPostAndDay.entries()) {
            const separatorIndex = key.indexOf(':');
            const postId = separatorIndex >= 0 ? key.slice(0, separatorIndex) : key;
            const entries = dailySnapshotsByPost.get(postId) ?? [];
            entries.push(snapshot);
            dailySnapshotsByPost.set(postId, entries);
        }
        const dailyTotalsMap = new Map();
        const selectedDateKey = this.getLocalDateKey(startOfDay);
        for (const [, snapshots] of dailySnapshotsByPost.entries()) {
            snapshots.sort((a, b) => a.date.localeCompare(b.date));
            let previous = { views: 0, likes: 0, comments: 0 };
            for (const snapshot of snapshots) {
                const current = dailyTotalsMap.get(snapshot.date) ?? {
                    views: 0,
                    likes: 0,
                    comments: 0,
                };
                const viewsDelta = Math.max(snapshot.views - previous.views, 0);
                const likesDelta = Math.max(snapshot.likes - previous.likes, 0);
                const commentsDelta = Math.max(snapshot.comments - previous.comments, 0);
                dailyTotalsMap.set(snapshot.date, {
                    views: current.views + viewsDelta,
                    likes: current.likes + likesDelta,
                    comments: current.comments + commentsDelta,
                });
                previous = {
                    views: snapshot.views,
                    likes: snapshot.likes,
                    comments: snapshot.comments,
                };
            }
        }
        const dailySeries = Array.from(dailyTotalsMap.entries())
            .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
            .map(([date, totals]) => ({
            date,
            views: totals.views,
            likes: totals.likes,
            comments: totals.comments,
        }));
        const totalsForDay = dailyTotalsMap.get(selectedDateKey) ?? {
            views: 0,
            likes: 0,
            comments: 0,
        };
        const postedToday = postedTodayPosts
            .map((post) => ({
            id: post.id,
            title: post.title,
            videoUrl: post.videoUrl,
            platform: post.platform,
            status: post.status,
            postedAt: post.postedAt,
            scheduledAt: post.scheduledAt,
            latestAnalytics: post.analytics[0] ?? null,
        }))
            .sort((a, b) => (b.latestAnalytics?.views ?? 0) - (a.latestAnalytics?.views ?? 0));
        const totalViewsAllVideos = postedVideos.reduce((acc, item) => acc + (item.analytics[0]?.views ?? 0), 0);
        const totalsAllTime = postedVideos.reduce((acc, item) => {
            acc.views += item.analytics[0]?.views ?? 0;
            acc.likes += item.analytics[0]?.likes ?? 0;
            acc.comments += item.analytics[0]?.comments ?? 0;
            return acc;
        }, { views: 0, likes: 0, comments: 0 });
        return {
            date: selectedDateKey,
            totalsForDay,
            totalsAllTime,
            totalPostedVideos: postedVideos.length,
            totalViewsAllVideos,
            dailySeries,
            postedToday,
        };
    }
    async createPostFromYoutubeUrl(data) {
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
            throw new common_1.NotFoundException(`Usuario ${data.userId} nao encontrado`);
        }
        if (!niche || !niche.active) {
            throw new common_1.BadRequestException('Nicho nao encontrado ou inativo');
        }
        if (!youtubeAccount) {
            throw new common_1.BadRequestException('Conta YouTube nao conectada para este usuario');
        }
        const videoId = this.extractYouTubeVideoId(data.youtubeUrl);
        if (!videoId) {
            throw new common_1.BadRequestException('URL do YouTube invalida');
        }
        const scheduledAt = new Date(data.scheduledAt);
        if (Number.isNaN(scheduledAt.getTime())) {
            throw new common_1.BadRequestException('scheduledAt invalido');
        }
        const metadata = await this.fetchYoutubeMetadata(data.youtubeUrl);
        const title = metadata?.title ?? `Video do YouTube importado | ${videoId.slice(0, 8)}`;
        const description = metadata?.description ?? `Importado de ${data.youtubeUrl}`;
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
    async getUsersWithNiches() {
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
        return usersWithYoutube.map((user) => {
            return {
                id: user.id,
                niches: activeNiches,
            };
        });
    }
    async createAutoPosts(userId, nicheId) {
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
        if (existingPosts >= 3) {
            console.log(`⚠️ Já existem ${existingPosts} posts hoje para user ${userId} e niche ${nicheId}`);
            return [];
        }
        const posts = [];
        const platforms = ['YOUTUBE'];
        const startIndex = Math.floor(existingPosts / platforms.length);
        for (let i = startIndex; i < 3; i++) {
            const scheduledDate = new Date(now);
            scheduledDate.setMinutes(now.getMinutes() + 1 + i);
            for (const platform of platforms) {
                const post = await this.prisma.post.create({
                    data: {
                        title: `${niche.name} | Conteudo automatico #${i + 1}`,
                        description: niche.description ?? `Post automatico para o nicho ${niche.name}`,
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
    async importInboxVideosAsShorts() {
        const inboxDir = this.getInboxDir();
        const queueDir = this.getQueueDir();
        if (!(0, fs_1.existsSync)(inboxDir)) {
            return [];
        }
        const [user, niche] = await Promise.all([
            this.findDefaultAutoPostUser(),
            this.findDefaultAutoPostNiche(),
        ]);
        if (!user || !niche) {
            return [];
        }
        const inboxFiles = await (0, promises_1.readdir)(inboxDir);
        const videoFiles = inboxFiles
            .filter((fileName) => this.isVideoFile(fileName))
            .sort((a, b) => a.localeCompare(b));
        if (!videoFiles.length) {
            return [];
        }
        await (0, promises_1.mkdir)(queueDir, { recursive: true });
        const latestScheduledPost = await this.prisma.post.findFirst({
            where: {
                userId: user.id,
                platform: 'YOUTUBE',
                scheduledAt: {
                    not: null,
                },
            },
            orderBy: {
                scheduledAt: 'desc',
            },
            select: {
                scheduledAt: true,
            },
        });
        const scheduleReferenceDate = latestScheduledPost?.scheduledAt &&
            latestScheduledPost.scheduledAt > new Date()
            ? latestScheduledPost.scheduledAt
            : new Date();
        const importedVideos = [];
        for (const [index, fileName] of videoFiles.entries()) {
            const sourcePath = (0, path_1.resolve)(inboxDir, fileName);
            const extension = (0, path_1.extname)(fileName).toLowerCase();
            const baseName = (0, path_1.basename)(fileName, extension)
                .replace(/[_-]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            const title = baseName || 'Short automatica';
            const scheduledAt = this.getInboxScheduledAt(scheduleReferenceDate, index);
            const post = await this.prisma.post.create({
                data: {
                    title: title.length > 255 ? title.slice(0, 255) : title,
                    description: `#Shorts\n\n${title}`,
                    platform: 'YOUTUBE',
                    status: 'PENDING',
                    scheduledAt,
                    niche: {
                        connect: { id: niche.id },
                    },
                    user: {
                        connect: { id: user.id },
                    },
                },
            });
            const targetPath = (0, path_1.resolve)(queueDir, `${post.id}${extension}`);
            await (0, promises_1.rename)(sourcePath, targetPath);
            await this.prisma.post.update({
                where: { id: post.id },
                data: {
                    videoUrl: targetPath,
                },
            });
            importedVideos.push({
                postId: post.id,
                fileName,
                scheduledAt,
            });
            console.log(`📥 Short importado automaticamente | arquivo: ${fileName} | post: ${post.id}`);
        }
        return importedVideos;
    }
    getInboxScheduledAt(referenceDate, offset) {
        const slotHours = [9, 13, 17];
        const baseDate = new Date(referenceDate);
        const currentMinutes = baseDate.getHours() * 60 + baseDate.getMinutes();
        let slotIndex = slotHours.findIndex((hour) => hour * 60 > currentMinutes);
        let dayOffset = 0;
        if (slotIndex === -1) {
            slotIndex = 0;
            dayOffset = 1;
        }
        const totalIndex = slotIndex + offset;
        dayOffset += Math.floor(totalIndex / slotHours.length);
        const scheduledDate = new Date(baseDate);
        scheduledDate.setHours(0, 0, 0, 0);
        scheduledDate.setDate(scheduledDate.getDate() + dayOffset);
        scheduledDate.setHours(slotHours[totalIndex % slotHours.length], 0, 0, 0);
        return scheduledDate;
    }
    extractYouTubeVideoId(url) {
        try {
            const parsed = new URL(url);
            if (parsed.hostname.includes('youtu.be')) {
                const value = parsed.pathname.replace('/', '').trim();
                return value || null;
            }
            if (parsed.hostname.includes('youtube.com')) {
                const v = parsed.searchParams.get('v');
                if (v)
                    return v;
                const shorts = parsed.pathname.match(/^\/shorts\/([^/?]+)/);
                if (shorts?.[1])
                    return shorts[1];
                const embed = parsed.pathname.match(/^\/embed\/([^/?]+)/);
                if (embed?.[1])
                    return embed[1];
            }
            return null;
        }
        catch {
            return null;
        }
    }
    async fetchYoutubeMetadata(url) {
        try {
            const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
            const response = await fetch(oembedUrl);
            if (!response.ok)
                return null;
            const payload = (await response.json());
            return {
                title: payload.title,
            };
        }
        catch {
            return null;
        }
    }
    async uploadVideoPost(file, data) {
        if (!data) {
            throw new common_1.BadRequestException('Body ausente. Envie multipart/form-data com userId, nicheId, title e scheduledAt.');
        }
        if (!data.userId || !data.nicheId || !data.title || !data.scheduledAt) {
            throw new common_1.BadRequestException('Campos obrigatorios ausentes: userId, nicheId, title e scheduledAt.');
        }
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
            throw new common_1.NotFoundException(`Usuario ${data.userId} nao encontrado`);
        }
        if (!niche || !niche.active) {
            throw new common_1.BadRequestException('Nicho nao encontrado ou inativo');
        }
        if (!youtubeAccount) {
            throw new common_1.BadRequestException('Conta YouTube nao conectada para este usuario');
        }
        if (!this.isUploadVideoFile(file)) {
            throw new common_1.BadRequestException('Conteudo do arquivo de vídeo invalido');
        }
        const validExtensions = ['.mp4', '.mov', '.webm', '.mkv'];
        const fileExtension = (0, path_1.extname)(file.originalname).toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
            throw new common_1.BadRequestException(`Extensão invalida. Aceitos: ${validExtensions.join(', ')}`);
        }
        const queueDir = 'uploads/queue';
        await (0, promises_1.mkdir)(queueDir, { recursive: true });
        const scheduledAt = new Date(data.scheduledAt);
        if (Number.isNaN(scheduledAt.getTime())) {
            throw new common_1.BadRequestException('scheduledAt invalido');
        }
        const fileName = `${Date.now()}_${data.userId.slice(0, 8)}${fileExtension}`;
        const filePath = (0, path_1.resolve)(queueDir, fileName);
        await (0, promises_1.writeFile)(filePath, file.buffer);
        const post = await this.prisma.post.create({
            data: {
                title: data.title,
                description: data.description,
                videoUrl: filePath,
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
        return {
            ...post,
            message: '✅ Vídeo enviado! Será publicado no horário agendado.',
        };
    }
    async findDefaultAutoPostUser() {
        const preferredUserId = this.configService.get('AUTO_POST_USER_ID')?.trim() ?? '';
        if (preferredUserId) {
            const user = await this.prisma.user.findUnique({
                where: { id: preferredUserId },
                select: { id: true },
            });
            if (user) {
                return user;
            }
        }
        return this.prisma.user.findFirst({
            where: {
                socialAccounts: {
                    some: {
                        platform: 'YOUTUBE',
                    },
                },
            },
            select: { id: true },
        });
    }
    async findDefaultAutoPostNiche() {
        const preferredNicheId = this.configService.get('AUTO_POST_NICHE_ID')?.trim() ?? '';
        if (preferredNicheId) {
            const niche = await this.prisma.niche.findUnique({
                where: { id: preferredNicheId },
                select: { id: true, active: true },
            });
            if (niche?.active) {
                return { id: niche.id };
            }
        }
        return this.prisma.niche.findFirst({
            where: { active: true },
            select: { id: true },
        });
    }
    getInboxDir() {
        return (0, path_1.resolve)(this.configService.get('LOCAL_VIDEO_INBOX_DIR') ??
            'uploads/inbox');
    }
    getQueueDir() {
        return (0, path_1.resolve)(this.configService.get('LOCAL_VIDEO_QUEUE_DIR') ??
            'uploads/queue');
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], PostsService);
//# sourceMappingURL=posts.service.js.map