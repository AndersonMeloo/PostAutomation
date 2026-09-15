import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Platform } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<Omit<{
        email: string;
        name: string | null;
        password: string | null;
        id: string;
        googleId: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        name: string | null;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    findAllEmails(): Promise<{
        email: string;
    }[]>;
    findUserByEmail(email: string): Promise<{
        email: string;
        name: string | null;
        password: string | null;
        id: string;
        googleId: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findOne(id: string): Promise<{
        email: string;
        name: string | null;
        password: string | null;
        id: string;
        googleId: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getYoutubeConnection(id: string): Promise<{
        connected: boolean;
        account: {
            id: string;
            platform: Platform;
            tokenExpiry: Date | null;
        } | null;
    }>;
    disconnectYoutube(id: string): Promise<{
        message: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        name: string | null;
        password: string | null;
        id: string;
        googleId: string | null;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
