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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./auth.service");
const login_auth_dto_1 = require("./dto/login-auth.dto");
const google_auth_guard_1 = require("./guards/google-auth.guard");
let AuthController = class AuthController {
    authService;
    configService;
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    googleAuth() {
        return;
    }
    googleAuthTest(accessToken, refreshToken, provider) {
        return {
            message: 'Login Google testado sem frontend',
            provider,
            accessToken,
            refreshToken,
        };
    }
    async googleAuthRedirect(req, res) {
        const tokens = await this.authService.loginWithGoogle(req.user);
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:5173';
        const frontendGooglePath = this.configService.get('FRONTEND_GOOGLE_REDIRECT_PATH') ||
            '/auth/google/callback';
        if (!frontendUrl) {
            throw new common_1.InternalServerErrorException('FRONTEND_URL nao configurada');
        }
        const redirectUrl = new URL(frontendGooglePath, frontendUrl);
        redirectUrl.searchParams.set('accessToken', tokens.accessToken);
        redirectUrl.searchParams.set('refreshToken', tokens.refreshToken);
        redirectUrl.searchParams.set('provider', 'google');
        res.redirect(redirectUrl.toString());
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const result = await this.authService.login(email, password);
        return result;
    }
    refresh(refreshToken) {
        return this.authService.refreshToken(refreshToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/test'),
    __param(0, (0, common_1.Query)('accessToken')),
    __param(1, (0, common_1.Query)('refreshToken')),
    __param(2, (0, common_1.Query)('provider')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthTest", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map