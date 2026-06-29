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
            id: string;
            name: string;
        };
        analytics: {
            id: string;
            views: number;
            likes: number;
            comments: number;
            collectedAt: Date;
            postId: string;
        }[];
    } & {
        id: string;
        description: string | null;
        platform: import("@prisma/client").$Enums.Platform;
        userId: string;
        title: string;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        nicheId: string;
        scheduledAt: Date | null;
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
        description: string | null;
        platform: import("@prisma/client").$Enums.Platform;
        userId: string;
        title: string;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        nicheId: string;
        scheduledAt: Date | null;
    }>;
    uploadVideo(req: {
        user?: {
            sub?: string;
        };
    }, file: Multer.File, data: UploadVideoPostDto): Promise<{
        message: string;
        id: string;
        description: string | null;
        platform: import("@prisma/client").$Enums.Platform;
        userId: string;
        title: string;
        videoUrl: string | null;
        postedAt: Date | null;
        status: import("@prisma/client").$Enums.PostStatus;
        nicheId: string;
        scheduledAt: Date | null;
    }>;
}
