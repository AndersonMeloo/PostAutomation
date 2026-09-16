import { StorableFile, StoredFile, VideoStorageAdapter } from './video-storage.interface';
export declare class LocalVideoStorageAdapter implements VideoStorageAdapter {
    private store;
    uploadVideo(file: StorableFile, ownerId: string): Promise<StoredFile>;
    uploadThumbnail(file: StorableFile, ownerId: string): Promise<StoredFile>;
    delete(url: string): Promise<void>;
}
