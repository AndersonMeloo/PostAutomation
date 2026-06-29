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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../database/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOrCreateGoogleUser(data) {
        const existingByGoogleId = await this.prisma.user.findUnique({
            where: { googleId: data.googleId },
        });
        if (existingByGoogleId)
            return existingByGoogleId;
        const existingByEmail = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingByEmail) {
            return this.prisma.user.update({
                where: { id: existingByEmail.id },
                data: {
                    googleId: data.googleId,
                    name: existingByEmail.name ?? data.name,
                },
            });
        }
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                googleId: data.googleId,
            },
        });
    }
    async upsertSocialAccount(data) {
        const existingAccount = await this.prisma.socialAccount.findFirst({
            where: {
                userId: data.userId,
                platform: data.platform,
            },
        });
        if (existingAccount) {
            return this.prisma.socialAccount.update({
                where: { id: existingAccount.id },
                data: {
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken ?? existingAccount.refreshToken ?? null,
                    tokenExpiry: data.tokenExpiry ?? existingAccount.tokenExpiry,
                },
            });
        }
        return this.prisma.socialAccount.create({
            data: {
                userId: data.userId,
                platform: data.platform,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken ?? null,
                tokenExpiry: data.tokenExpiry ?? null,
            },
        });
    }
    async getYoutubeConnectionStatus(userId) {
        const account = await this.prisma.socialAccount.findFirst({
            where: {
                userId,
                platform: client_1.Platform.YOUTUBE,
            },
            select: {
                id: true,
                platform: true,
                tokenExpiry: true,
            },
        });
        return {
            connected: Boolean(account),
            account,
        };
    }
    async disconnectYoutube(userId) {
        const account = await this.prisma.socialAccount.findFirst({
            where: {
                userId,
                platform: client_1.Platform.YOUTUBE,
            },
            select: {
                id: true,
            },
        });
        if (!account) {
            return {
                message: 'Conta YouTube ja estava desconectada',
            };
        }
        await this.prisma.socialAccount.delete({
            where: { id: account.id },
        });
        return {
            message: 'Conta YouTube desconectada com sucesso',
        };
    }
    async create(createUserDto) {
        if (!createUserDto.password) {
            throw new Error('Password é obrigatório');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                name: createUserDto.name,
                password: hashedPassword,
            },
        });
        const userWithoutPassword = Object.fromEntries(Object.entries(user).filter(([key]) => key !== 'password'));
        return userWithoutPassword;
    }
    async findUserByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findAllEmails() {
        return this.prisma.user.findMany({
            select: {
                email: true,
            },
        });
    }
    findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não foi encontrado`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não foi encontrado`);
        }
        return this.prisma.user.update({
            where: { id },
            data: {
                ...updateUserDto,
            },
        });
    }
    async remove(id) {
        try {
            const user = await this.prisma.user.delete({
                where: { id },
            });
            return {
                message: `Usuário ${user.name} foi deletado com sucesso`,
            };
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2025') {
                throw new common_1.NotFoundException(`Usuário com ID ${id} não foi encontrado`);
            }
            throw err;
        }
    }
    async updateRefreshToken(userId, token) {
        const hashedToken = await bcrypt.hash(token, 10);
        return this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: hashedToken },
        });
    }
    async getUserIfRefreshTokenMatches(userId, token) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user || !user.refreshToken)
            return null;
        const isMatch = await bcrypt.compare(token, user.refreshToken);
        if (!isMatch)
            return null;
        return user;
    }
    async removeRefreshToken(userId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map