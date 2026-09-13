"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const googleapis_1 = require("googleapis");
const bcrypt = __importStar(require("bcrypt"));
const users_service_1 = require("../users/users.service");
const YOUTUBE_CONNECT_SCOPES = [
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly',
];
let AuthService = class AuthService {
    userService;
    jwtService;
    configService;
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async generateTokens(userId, email, role) {
        const payload = {
            sub: userId,
            email,
            role,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });
        await this.userService.updateRefreshToken(userId, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    }
    async validateGoogleUser(profile) {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            throw new common_1.UnauthorizedException('Nao foi possivel recuperar o email da conta Google');
        }
        return this.userService.findOrCreateGoogleUser({
            email,
            googleId: profile.id,
            name: profile.displayName || null,
        });
    }
    async loginWithGoogle(user) {
        return this.generateTokens(user.id, user.email, user.role);
    }
    getYoutubeConnectUrl(userId) {
        const oauth2Client = this.buildGoogleOAuthClient(this.getYoutubeCallbackUrl());
        const state = this.jwtService.sign({ sub: userId, purpose: 'youtube-connect' }, { expiresIn: '10m' });
        return oauth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            include_granted_scopes: true,
            scope: YOUTUBE_CONNECT_SCOPES,
            state,
        });
    }
    async connectYoutubeAccount(code, state) {
        let userId;
        try {
            const payload = this.jwtService.verify(state);
            if (payload.purpose !== 'youtube-connect') {
                throw new Error('Purpose invalido');
            }
            userId = payload.sub;
        }
        catch {
            throw new common_1.UnauthorizedException('Nao foi possivel validar a solicitacao de conexao com o YouTube');
        }
        const oauth2Client = this.buildGoogleOAuthClient(this.getYoutubeCallbackUrl());
        const { tokens } = await oauth2Client.getToken(code);
        if (!tokens.id_token || !tokens.access_token) {
            throw new common_1.UnauthorizedException('Nao foi possivel identificar a conta Google conectada');
        }
        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: this.configService.get('GOOGLE_CLIENT_ID'),
        });
        const googleAccountId = ticket.getPayload()?.sub;
        if (!googleAccountId) {
            throw new common_1.UnauthorizedException('Conta Google sem identificador valido');
        }
        await this.userService.upsertSocialAccount({
            userId,
            platform: client_1.Platform.YOUTUBE,
            providerAccountId: googleAccountId,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        });
    }
    buildGoogleOAuthClient(redirectUri) {
        const clientID = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
        if (!clientID || !clientSecret) {
            throw new Error('GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET nao configurados');
        }
        return new googleapis_1.google.auth.OAuth2(clientID, clientSecret, redirectUri);
    }
    getYoutubeCallbackUrl() {
        const callbackUrl = this.configService.get('GOOGLE_YOUTUBE_CALLBACK_URL');
        if (!callbackUrl) {
            throw new Error('GOOGLE_YOUTUBE_CALLBACK_URL nao configurada');
        }
        return callbackUrl;
    }
    async login(email, password) {
        const user = await this.userService.findUserByEmail(email);
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException('Email ou senha inválidos');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException('Email ou senha inválidos');
        }
        return this.generateTokens(user.id, user.email, user.role);
    }
    async refreshToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userService.getUserIfRefreshTokenMatches(payload.sub, token);
            if (!user) {
                throw new common_1.UnauthorizedException('Token de refresh inválido');
            }
            return this.generateTokens(user.id, user.email, user.role);
        }
        catch (err) {
            console.log(err);
            throw new common_1.UnauthorizedException('Refresh token inválido');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map