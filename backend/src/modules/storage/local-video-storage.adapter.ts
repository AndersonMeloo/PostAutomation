import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { existsSync } from 'fs';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';
import {
  StorableFile,
  StoredFile,
  VideoStorageAdapter,
} from './video-storage.interface';

/**
 * Adapter padrão enquanto nenhum provedor de storage externo está configurado.
 * Usa o mesmo disco local do container (efêmero no Railway) - suficiente para
 * dev, mas um rascunho salvo aqui pode ser perdido num redeploy. Trocar para
 * o Supabase (ou outro) é só apontar as credenciais em .env; nenhum outro
 * código muda, veja VideoStorageModule.
 */
@Injectable()
export class LocalVideoStorageAdapter implements VideoStorageAdapter {
  private async store(
    subdir: 'videos' | 'thumbnails',
    file: StorableFile,
    ownerId: string,
  ): Promise<StoredFile> {
    const dir = resolve('uploads/drafts', subdir);
    await mkdir(dir, { recursive: true });

    const extension = extname(file.originalName).toLowerCase();
    const fileName = `${ownerId.slice(0, 8)}_${randomUUID()}${extension}`;
    const filePath = resolve(dir, fileName);

    await writeFile(filePath, file.buffer);

    return { url: filePath, path: filePath };
  }

  uploadVideo(file: StorableFile, ownerId: string): Promise<StoredFile> {
    return this.store('videos', file, ownerId);
  }

  uploadThumbnail(file: StorableFile, ownerId: string): Promise<StoredFile> {
    return this.store('thumbnails', file, ownerId);
  }

  async delete(path: string): Promise<void> {
    if (existsSync(path)) {
      await unlink(path);
    }
  }
}
