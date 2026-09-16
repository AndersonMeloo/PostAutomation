import type { Response } from 'express';
import { ImportYoutubePostDto } from './dto/import-youtube-post.dto';
import { UploadVideoPostDto } from './dto/upload-video-post.dto';
import { CreateDraftDto } from './dto/create-draft.dto';
import { EditDraftDto } from './dto/edit-draft.dto';
import { FinalizeDraftDto } from './dto/finalize-draft.dto';
import { PostsService } from './posts.service';
import type { Multer } from 'multer';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    private getUserIdFromRequest;
    findAllPosts(req: {
        user?: {
            sub?: string;
        };
    }): Promise<({
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
    getOverview(req: {
        user?: {
            sub?: string;
        };
    }, date?: string): Promise<{
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
    }>;
    getPostAnalytics(req: {
        user?: {
            sub?: string;
        };
    }, id: string): Promise<{
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
    listDrafts(req: {
        user?: {
            sub?: string;
        };
    }): Promise<{
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
    getDraft(req: {
        user?: {
            sub?: string;
        };
    }, id: string): Promise<{
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
    streamDraftVideo(req: {
        user?: {
            sub?: string;
        };
    }, id: string, res: Response): Promise<void>;
    streamDraftThumbnail(req: {
        user?: {
            sub?: string;
        };
    }, id: string, res: Response): Promise<void>;
    private streamDraftAsset;
    createDraft(req: {
        user?: {
            sub?: string;
        };
    }, file: Multer.File, data: CreateDraftDto): Promise<{
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
    editDraft(req: {
        user?: {
            sub?: string;
        };
    }, id: string, data: EditDraftDto): Promise<{
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
    uploadThumbnail(req: {
        user?: {
            sub?: string;
        };
    }, id: string, file: Multer.File): Promise<{
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
    finalizeDraft(req: {
        user?: {
            sub?: string;
        };
    }, id: string, data: FinalizeDraftDto): Promise<{
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
    deleteDraft(req: {
        user?: {
            sub?: string;
        };
    }, id: string): Promise<{
        message: string;
    }>;
    importYoutubeUrl(req: {
        user?: {
            sub?: string;
        };
    }, body: ImportYoutubePostDto): Promise<{
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
    uploadVideo(req: {
        user?: {
            sub?: string;
        };
    }, file: Multer.File, data: UploadVideoPostDto): Promise<{
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
}
