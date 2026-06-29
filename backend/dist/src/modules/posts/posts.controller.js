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
const jwt_auth_guards_1 = require("../../common/guards/jwt-auth.guards");
const import_youtube_post_dto_1 = require("./dto/import-youtube-post.dto");
const upload_video_post_dto_1 = require("./dto/upload-video-post.dto");
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