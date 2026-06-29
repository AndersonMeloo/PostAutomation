import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Platform } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    findAllEmails(): Promise<{
        email: string;
    }[]>;
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
}
