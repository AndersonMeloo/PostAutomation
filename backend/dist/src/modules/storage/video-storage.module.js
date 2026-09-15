"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoStorageModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const local_video_storage_adapter_1 = require("./local-video-storage.adapter");
const supabase_video_storage_adapter_1 = require("./supabase-video-storage.adapter");
const video_storage_interface_1 = require("./video-storage.interface");
let VideoStorageModule = class VideoStorageModule {
};
exports.VideoStorageModule = VideoStorageModule;
exports.VideoStorageModule = VideoStorageModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            local_video_storage_adapter_1.LocalVideoStorageAdapter,
            supabase_video_storage_adapter_1.SupabaseVideoStorageAdapter,
            {
                provide: video_storage_interface_1.VIDEO_STORAGE,
                useFactory: (configService, local, supabase) => {
                    const hasSupabaseCredentials = Boolean(configService.get('SUPABASE_URL')) &&
                        Boolean(configService.get('SUPABASE_SERVICE_ROLE_KEY'));
                    return hasSupabaseCredentials ? supabase : local;
                },
                inject: [
                    config_1.ConfigService,
                    local_video_storage_adapter_1.LocalVideoStorageAdapter,
                    supabase_video_storage_adapter_1.SupabaseVideoStorageAdapter,
                ],
            },
        ],
        exports: [video_storage_interface_1.VIDEO_STORAGE],
    })
], VideoStorageModule);
//# sourceMappingURL=video-storage.module.js.map