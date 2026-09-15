import { ImportYoutubePostDto } from './dto/import-youtube-post.dto';
import { UploadVideoPostDto } from './dto/upload-video-post.dto';
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
            name: string;
            id: string;
        };
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
        userId: string;
        status: import("@prisma/client").$Enums.PostStatus;
        nicheId: string;
        scheduledAt: Date | null;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
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
    importYoutubeUrl(req: {
        user?: {
            sub?: string;
        };
    }, body: ImportYoutubePostDto): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        userId: string;
        status: import("@prisma/client").$Enums.PostStatus;
        nicheId: string;
        scheduledAt: Date | null;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
    }>;
    uploadVideo(req: {
        user?: {
            sub?: string;
        };
    }, file: Multer.File, data: UploadVideoPostDto): Promise<{
        message: string;
        id: string;
        platform: import("@prisma/client").$Enums.Platform;
        userId: string;
        status: import("@prisma/client").$Enums.PostStatus;
        nicheId: string;
        scheduledAt: Date | null;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
    }>;
}
