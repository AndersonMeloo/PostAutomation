export const VIDEO_STORAGE = Symbol('VIDEO_STORAGE');

export type StorableFile = {
  buffer: Buffer;
  originalName: string;
};

export type StoredFile = {
  /**
   * Onde o arquivo pode ser lido de volta: path absoluto local ou URL pública,
   * conforme o adapter. O pipeline de publicação já sabe lidar com os dois
   * (fetch de URL http(s) ou leitura de arquivo local).
   */
  url: string;
  /** Referência interna do adapter, usada para deletar o arquivo depois. */
  path: string;
};

export interface VideoStorageAdapter {
  uploadVideo(file: StorableFile, ownerId: string): Promise<StoredFile>;
  uploadThumbnail(file: StorableFile, ownerId: string): Promise<StoredFile>;
  delete(path: string): Promise<void>;
}
