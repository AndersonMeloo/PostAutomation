import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalVideoStorageAdapter } from './local-video-storage.adapter';
import { SupabaseVideoStorageAdapter } from './supabase-video-storage.adapter';
import { VIDEO_STORAGE } from './video-storage.interface';

@Module({
  imports: [ConfigModule],
  providers: [
    LocalVideoStorageAdapter,
    SupabaseVideoStorageAdapter,
    {
      provide: VIDEO_STORAGE,
      useFactory: (
        configService: ConfigService,
        local: LocalVideoStorageAdapter,
        supabase: SupabaseVideoStorageAdapter,
      ) => {
        const hasSupabaseCredentials =
          Boolean(configService.get<string>('SUPABASE_URL')) &&
          Boolean(configService.get<string>('SUPABASE_SERVICE_ROLE_KEY'));

        return hasSupabaseCredentials ? supabase : local;
      },
      inject: [
        ConfigService,
        LocalVideoStorageAdapter,
        SupabaseVideoStorageAdapter,
      ],
    },
  ],
  exports: [VIDEO_STORAGE],
})
export class VideoStorageModule {}
