import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
type GoogleOAuthProfile = {
    id: string;
    displayName?: string;
    emails?: Array<{
        value?: string;
    }>;
};
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    generateTokens(userId: string, email: string, role: string | null): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateGoogleUser(profile: GoogleOAuthProfile, accessToken: string, refreshToken: string): Promise<User>;
    loginWithGoogle(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
export {};
