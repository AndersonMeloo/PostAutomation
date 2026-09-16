"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseVideoStorageAdapter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
const crypto_1 = require("crypto");
const path_1 = require("path");
let SupabaseVideoStorageAdapter = class SupabaseVideoStorageAdapter {
    configService;
    client = null;
    constructor(configService) {
        this.configService = configService;
    }
    getClient() {
        if (!this.client) {
            const url = this.configService.get('SUPABASE_URL');
            const serviceRoleKey = this.configService.get('SUPABASE_SERVICE_ROLE_KEY');
            if (!url || !serviceRoleKey) {
                throw new Error('SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY sao obrigatorios para usar o Supabase Storage');
            }
            this.client = (0, supabase_js_1.createClient)(url, serviceRoleKey);
        }
        return this.client;
    }
    getBucket() {
        return (this.configService.get('SUPABASE_STORAGE_BUCKET') ?? 'videos');
    }
    async store(subdir, file, ownerId) {
        const extension = (0, path_1.extname)(file.originalName).toLowerCase();
        const objectPath = `${subdir}/${ownerId}/${(0, crypto_1.randomUUID)()}${extension}`;
        const { error } = await this.getClient()
            .storage.from(this.getBucket())
            .upload(objectPath, file.buffer, { upsert: false });
        if (error) {
            throw new Error(`Falha ao enviar arquivo para o Supabase Storage: ${error.message}`);
        }
        const { data } = this.getClient()
            .storage.from(this.getBucket())
            .getPublicUrl(objectPath);
        return { url: data.publicUrl };
    }
    uploadVideo(file, ownerId) {
        return this.store('videos', file, ownerId);
    }
    uploadThumbnail(file, ownerId) {
        return this.store('thumbnails', file, ownerId);
    }
    async delete(url) {
        const marker = `/object/public/${this.getBucket()}/`;
        const markerIndex = url.indexOf(marker);
        if (markerIndex === -1) {
            return;
        }
        const objectPath = decodeURIComponent(url.slice(markerIndex + marker.length));
        await this.getClient().storage.from(this.getBucket()).remove([objectPath]);
    }
};
exports.SupabaseVideoStorageAdapter = SupabaseVideoStorageAdapter;
exports.SupabaseVideoStorageAdapter = SupabaseVideoStorageAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseVideoStorageAdapter);
//# sourceMappingURL=supabase-video-storage.adapter.js.map