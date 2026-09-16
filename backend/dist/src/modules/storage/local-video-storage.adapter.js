"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalVideoStorageAdapter = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
let LocalVideoStorageAdapter = class LocalVideoStorageAdapter {
    async store(subdir, file, ownerId) {
        const dir = (0, path_1.resolve)('uploads/drafts', subdir);
        await (0, promises_1.mkdir)(dir, { recursive: true });
        const extension = (0, path_1.extname)(file.originalName).toLowerCase();
        const fileName = `${ownerId.slice(0, 8)}_${(0, crypto_1.randomUUID)()}${extension}`;
        const filePath = (0, path_1.resolve)(dir, fileName);
        await (0, promises_1.writeFile)(filePath, file.buffer);
        return { url: filePath };
    }
    uploadVideo(file, ownerId) {
        return this.store('videos', file, ownerId);
    }
    uploadThumbnail(file, ownerId) {
        return this.store('thumbnails', file, ownerId);
    }
    async delete(url) {
        if ((0, fs_1.existsSync)(url)) {
            await (0, promises_1.unlink)(url);
        }
    }
};
exports.LocalVideoStorageAdapter = LocalVideoStorageAdapter;
exports.LocalVideoStorageAdapter = LocalVideoStorageAdapter = __decorate([
    (0, common_1.Injectable)()
], LocalVideoStorageAdapter);
//# sourceMappingURL=local-video-storage.adapter.js.map