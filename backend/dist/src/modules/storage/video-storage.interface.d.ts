export declare const VIDEO_STORAGE: unique symbol;
export type StorableFile = {
    buffer: Buffer;
    originalName: string;
};
export type StoredFile = {
    url: string;
    path: string;
};
export interface VideoStorageAdapter {
    uploadVideo(file: StorableFile, ownerId: string): Promise<StoredFile>;
    uploadThumbnail(file: StorableFile, ownerId: string): Promise<StoredFile>;
    delete(path: string): Promise<void>;
}
