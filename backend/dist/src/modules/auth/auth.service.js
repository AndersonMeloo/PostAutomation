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
const client_1 = require("@prisma/client");
const users_service_1 = require("../users/users.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
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
    async validateGoogleUser(profile, accessToken, refreshToken) {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            throw new common_1.UnauthorizedException('Nao foi possivel recuperar o email da conta Google');
        }
        const user = await this.userService.findOrCreateGoogleUser({
            email,
            googleId: profile.id,
            name: profile.displayName || null,
        });
        await this.userService.upsertSocialAccount({
            userId: user.id,
            platform: client_1.Platform.YOUTUBE,
            accessToken,
            refreshToken,
        });
        return user;
    }
    async loginWithGoogle(user) {
        return this.generateTokens(user.id, user.email, user.role);
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
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map