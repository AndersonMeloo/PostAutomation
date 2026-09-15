import { ConfigService } from '@nestjs/config';
import { StorableFile, StoredFile, VideoStorageAdapter } from './video-storage.interface';
export declare class SupabaseVideoStorageAdapter implements VideoStorageAdapter {
    private readonly configService;
    private client;
    constructor(configService: ConfigService);
    private getClient;
    private getBucket;
    private store;
    uploadVideo(file: StorableFile, ownerId: string): Promise<StoredFile>;
    uploadThumbnail(file: StorableFile, ownerId: string): Promise<StoredFile>;
    delete(path: string): Promise<void>;
}
