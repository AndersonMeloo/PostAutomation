import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { ImportYoutubePostDto } from './dto/import-youtube-post.dto';
import { UploadVideoPostDto } from './dto/upload-video-post.dto';
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
    constructor(prisma: PrismaService, configService: ConfigService);
    private getLocalDateKey;
    private isUploadVideoFile;
    private isVideoFile;
    listPosts(userId: string): Promise<({
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
    getPostsOverviewByDate(userId: string, inputDate?: string): Promise<PostOverview>;
    createPostFromYoutubeUrl(data: ImportYoutubePostDto): Promise<{
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
    getUsersWithNiches(): Promise<UserWithNiches[]>;
    createAutoPosts(userId: string, nicheId: string): Promise<{
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
    }[]>;
    importInboxVideosAsShorts(): Promise<ImportedInboxVideo[]>;
    private getInboxScheduledAt;
    private extractYouTubeVideoId;
    private fetchYoutubeMetadata;
    uploadVideoPost(file: unknown, data: UploadVideoPostDto): Promise<{
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
    private findDefaultAutoPostUser;
    private findDefaultAutoPostNiche;
    private getInboxDir;
    private getQueueDir;
}
export {};
