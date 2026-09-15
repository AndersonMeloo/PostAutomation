import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { ImportYoutubePostDto } from './dto/import-youtube-post.dto';
import { UploadVideoPostDto } from './dto/upload-video-post.dto';
import { CreateDraftDto } from './dto/create-draft.dto';
import { EditDraftDto } from './dto/edit-draft.dto';
import { FinalizeDraftDto } from './dto/finalize-draft.dto';
import type { VideoStorageAdapter } from '../storage/video-storage.interface';
type UserWithNiches = {
    id: string;
    niches: {
        id: string;
        name: string;
        description: string | null;
        active: boolean;
    }[];
};
type ImportedInboxVideo = {
    postId: string;
    fileName: string;
    scheduledAt: Date;
};
type PostOverview = {
    date: string;
    totalsForDay: {
        views: number;
        likes: number;
        comments: number;
    };
    totalsAllTime: {
        views: number;
        likes: number;
        comments: number;
    };
    totalPostedVideos: number;
    totalViewsAllVideos: number;
    dailySeries: {
        date: string;
        views: number;
        likes: number;
        comments: number;
    }[];
    postedToday: {
        id: string;
        title: string;
        videoUrl: string | null;
        platform: string;
        status: string;
        postedAt: Date | null;
        scheduledAt: Date | null;
        latestAnalytics: {
            views: number;
            likes: number;
            comments: number;
            collectedAt: Date;
        } | null;
    }[];
};
export declare class PostsService {
    private readonly prisma;
    private readonly configService;
    private readonly videoStorage;
    constructor(prisma: PrismaService, configService: ConfigService, videoStorage: VideoStorageAdapter);
    private getLocalDateKey;
    private isMulterFile;
    private isVideoFile;
    listPosts(userId: string): Promise<({
        niche: {
            id: string;
            name: string;
        } | null;
        analytics: {
            comments: number;
            id: string;
            collectedAt: Date;
            views: number;
            likes: number;
            postId: string;
        }[];
    } & {
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    })[]>;
    getPostsOverviewByDate(userId: string, inputDate?: string): Promise<PostOverview>;
    getPostAnalyticsHistory(userId: string, postId: string): Promise<{
        post: {
            id: string;
            platform: import("@prisma/client").$Enums.Platform;
            title: string;
            status: import("@prisma/client").$Enums.PostStatus;
        };
        history: {
            comments: number;
            collectedAt: Date;
            views: number;
            likes: number;
        }[];
    }>;
    listDrafts(userId: string): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    }[]>;
    getDraftById(userId: string, postId: string): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    }>;
    getDraftAssetSource(userId: string, postId: string, kind: 'video' | 'thumbnail'): Promise<string>;
    createDraft(userId: string, file: unknown, data: CreateDraftDto): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    }>;
    editDraft(userId: string, postId: string, data: EditDraftDto): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    }>;
    uploadDraftThumbnail(userId: string, postId: string, file: unknown): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    }>;
    finalizeDraft(userId: string, postId: string, data: FinalizeDraftDto): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    }>;
    createPostFromYoutubeUrl(data: ImportYoutubePostDto): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    }>;
    getUsersWithNiches(): Promise<UserWithNiches[]>;
    createAutoPosts(userId: string, nicheId: string): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    }[]>;
    importInboxVideosAsShorts(): Promise<ImportedInboxVideo[]>;
    private getInboxScheduledAt;
    private extractYouTubeVideoId;
    private fetchYoutubeMetadata;
    uploadVideoPost(file: unknown, data: UploadVideoPostDto): Promise<{
        message: string;
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        scheduledAt: Date | null;
        createdAt: Date;
        nicheId: string | null;
        format: import("@prisma/client").$Enums.VideoFormat | null;
        thumbnailUrl: string | null;
        trimStart: number | null;
        trimEnd: number | null;
        userId: string;
    }>;
    private findDefaultAutoPostUser;
    private findDefaultAutoPostNiche;
    private getInboxDir;
    private getQueueDir;
}
export {};
