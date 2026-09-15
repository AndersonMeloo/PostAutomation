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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const jwt_auth_guards_1 = require("../../common/guards/jwt-auth.guards");
const import_youtube_post_dto_1 = require("./dto/import-youtube-post.dto");
const upload_video_post_dto_1 = require("./dto/upload-video-post.dto");
const create_draft_dto_1 = require("./dto/create-draft.dto");
const edit_draft_dto_1 = require("./dto/edit-draft.dto");
const finalize_draft_dto_1 = require("./dto/finalize-draft.dto");
const posts_service_1 = require("./posts.service");
let PostsController = class PostsController {
    postsService;
    constructor(postsService) {
        this.postsService = postsService;
    }
    getUserIdFromRequest(req) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new common_1.UnauthorizedException('Usuario autenticado nao encontrado na requisicao');
        }
        return userId;
    }
    findAllPosts(req) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.listPosts(userId);
    }
    getOverview(req, date) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.getPostsOverviewByDate(userId, date);
    }
    getPostAnalytics(req, id) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.getPostAnalyticsHistory(userId, id);
    }
    listDrafts(req) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.listDrafts(userId);
    }
    getDraft(req, id) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.getDraftById(userId, id);
    }
    async streamDraftVideo(req, id, res) {
        const userId = this.getUserIdFromRequest(req);
        await this.streamDraftAsset(userId, id, 'video', res);
    }
    async streamDraftThumbnail(req, id, res) {
        const userId = this.getUserIdFromRequest(req);
        await this.streamDraftAsset(userId, id, 'thumbnail', res);
    }
    async streamDraftAsset(userId, postId, kind, res) {
        const source = await this.postsService.getDraftAssetSource(userId, postId, kind);
        if (/^https?:\/\//i.test(source)) {
            res.redirect(source);
            return;
        }
        if (!(0, fs_1.existsSync)(source)) {
            res.status(404).end();
            return;
        }
        res.sendFile(source);
    }
    createDraft(req, file, data) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.createDraft(userId, file, data);
    }
    editDraft(req, id, data) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.editDraft(userId, id, data);
    }
    uploadThumbnail(req, id, file) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.uploadDraftThumbnail(userId, id, file);
    }
    finalizeDraft(req, id, data) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.finalizeDraft(userId, id, data);
    }
    importYoutubeUrl(req, body) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.createPostFromYoutubeUrl({
            ...body,
            userId,
        });
    }
    uploadVideo(req, file, data) {
        const userId = this.getUserIdFromRequest(req);
        return this.postsService.uploadVideoPost(file, {
            ...data,
            userId,
        });
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAllPosts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Get)('overview'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getOverview", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Get)(':id/analytics'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPostAnalytics", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Get)('drafts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "listDrafts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Get)(':id/draft'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getDraft", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Get)(':id/draft/video'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "streamDraftVideo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Get)(':id/draft/thumbnail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "streamDraftThumbnail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Post)('draft'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('video')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_draft_dto_1.CreateDraftDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "createDraft", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Patch)(':id/edit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, edit_draft_dto_1.EditDraftDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "editDraft", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Post)(':id/thumbnail'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('thumbnail')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "uploadThumbnail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Patch)(':id/finalize'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, finalize_draft_dto_1.FinalizeDraftDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "finalizeDraft", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Post)('import-youtube-url'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, import_youtube_post_dto_1.ImportYoutubePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "importYoutubeUrl", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guards_1.AuthGuard),
    (0, common_1.Post)('upload-video'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('video')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, upload_video_post_dto_1.UploadVideoPostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "uploadVideo", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map