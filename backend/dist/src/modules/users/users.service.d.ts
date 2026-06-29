import { Platform, Prisma, SocialAccount, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOrCreateGoogleUser(data: {
        email: string;
        googleId: string;
        name: string | null;
    }): Promise<User>;
    upsertSocialAccount(data: {
        userId: string;
        platform: Platform;
        accessToken: string;
        refreshToken?: string | null;
        tokenExpiry?: Date | null;
    }): Promise<SocialAccount>;
    getYoutubeConnectionStatus(userId: string): Promise<{
        connected: boolean;
        account: {
            id: string;
            platform: import("@prisma/client").$Enums.Platform;
            tokenExpiry: Date | null;
        } | null;
    }>;
    disconnectYoutube(userId: string): Promise<{
        message: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<Omit<{
        id: string;
        email: string;
        name: string | null;
        googleId: string | null;
        password: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    findUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        googleId: string | null;
        password: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findAllEmails(): Promise<{
        email: string;
    }[]>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        googleId: string | null;
        password: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        googleId: string | null;
        password: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    updateRefreshToken(userId: string, token: string): Promise<User>;
    getUserIfRefreshTokenMatches(userId: string, token: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        googleId: string | null;
        password: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    removeRefreshToken(userId: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        googleId: string | null;
        password: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
