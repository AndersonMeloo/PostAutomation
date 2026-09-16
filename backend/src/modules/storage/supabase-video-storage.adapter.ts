import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import {
  StorableFile,
  StoredFile,
  VideoStorageAdapter,
} from './video-storage.interface';

/**
 * Storage persistente (mesmo projeto Supabase já usado pro Postgres). Só é
 * selecionado por VideoStorageModule quando SUPABASE_URL e
 * SUPABASE_SERVICE_ROLE_KEY estão preenchidos - por isso o client é criado de
 * forma preguiçosa (na primeira chamada), nunca no construtor: assim esta
 * classe pode existir como provider do Nest mesmo antes de essas credenciais
 * existirem, sem derrubar o boot da aplicação.
 */
@Injectable()
export class SupabaseVideoStorageAdapter implements VideoStorageAdapter {
  private client: SupabaseClient | null = null;

  constructor(private readonly configService: ConfigService) {}

  private getClient(): SupabaseClient {
    if (!this.client) {
      const url = this.configService.get<string>('SUPABASE_URL');
      const serviceRoleKey = this.configService.get<string>(
        'SUPABASE_SERVICE_ROLE_KEY',
      );

      if (!url || !serviceRoleKey) {
        throw new Error(
          'SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY sao obrigatorios para usar o Supabase Storage',
        );
      }

      this.client = createClient(url, serviceRoleKey);
    }

    return this.client;
  }

  private getBucket(): string {
    return (
      this.configService.get<string>('SUPABASE_STORAGE_BUCKET') ?? 'videos'
    );
  }

  private async store(
    subdir: 'videos' | 'thumbnails',
    file: StorableFile,
    ownerId: string,
  ): Promise<StoredFile> {
    const extension = extname(file.originalName).toLowerCase();
    const objectPath = `${subdir}/${ownerId}/${randomUUID()}${extension}`;

    const { error } = await this.getClient()
      .storage.from(this.getBucket())
      .upload(objectPath, file.buffer, { upsert: false });

    if (error) {
      throw new Error(
        `Falha ao enviar arquivo para o Supabase Storage: ${error.message}`,
      );
    }

    const { data } = this.getClient()
      .storage.from(this.getBucket())
      .getPublicUrl(objectPath);

    return { url: data.publicUrl };
  }

  uploadVideo(file: StorableFile, ownerId: string): Promise<StoredFile> {
    return this.store('videos', file, ownerId);
  }

  uploadThumbnail(file: StorableFile, ownerId: string): Promise<StoredFile> {
    return this.store('thumbnails', file, ownerId);
  }

  async delete(url: string): Promise<void> {
    // Só temos a URL pública salva no Post - extrai de volta o path relativo
    // ao bucket (o que .remove() espera) a partir dela.
    const marker = `/object/public/${this.getBucket()}/`;
    const markerIndex = url.indexOf(marker);

    if (markerIndex === -1) {
      return;
    }

    const objectPath = decodeURIComponent(url.slice(markerIndex + marker.length));
    await this.getClient().storage.from(this.getBucket()).remove([objectPath]);
  }
}
