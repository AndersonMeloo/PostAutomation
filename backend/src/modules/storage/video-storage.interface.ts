export const VIDEO_STORAGE = Symbol('VIDEO_STORAGE');

export type StorableFile = {
  buffer: Buffer;
  originalName: string;
};

export type StoredFile = {
  /**
   * Onde o arquivo pode ser lido de volta: path absoluto local ou URL pública,
   * conforme o adapter. O pipeline de publicação já sabe lidar com os dois
   * (fetch de URL http(s) ou leitura de arquivo local). É esse valor (e só
   * ele) que fica salvo em Post.videoUrl/thumbnailUrl - por isso delete()
   * recebe de volta essa mesma URL, e cada adapter sabe derivar dela o que
   * precisa pra apagar o arquivo de verdade.
   */
  url: string;
};

export interface VideoStorageAdapter {
  uploadVideo(file: StorableFile, ownerId: string): Promise<StoredFile>;
  uploadThumbnail(file: StorableFile, ownerId: string): Promise<StoredFile>;
  delete(url: string): Promise<void>;
}
