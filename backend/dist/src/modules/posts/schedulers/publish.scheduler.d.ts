import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
export declare class PublishScheduler {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    handlePublish(): Promise<void>;
    private syncYoutubeAnalyticsSnapshots;
    private fetchYoutubeVideoStatistics;
    private buildYoutubeClient;
    private attachQueueVideosToPendingPosts;
    private publishToPlatform;
    private publishToYoutube;
    private getYoutubePrivacyStatus;
    private getMediaFromPost;
    private resolveMimeType;
    private persistLatestGoogleTokens;
    private archiveLocalVideoIfNeeded;
    private isYoutubeUrl;
    private extractYouTubeVideoId;
    private isHttpUrl;
    private isVideoFile;
    private getErrorMessage;
    private getYoutubeAuthIssue;
    private buildFailedDescription;
    private getQueueDir;
    private getProcessingDir;
    private getPublishedDir;
}
