import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
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
    private readonly configService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService);
    generateTokens(userId: string, email: string, role: string | null): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateGoogleUser(profile: GoogleOAuthProfile): Promise<User>;
    loginWithGoogle(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getYoutubeConnectUrl(userId: string): string;
    connectYoutubeAccount(code: string, state: string): Promise<void>;
    private buildGoogleOAuthClient;
    private getYoutubeCallbackUrl;
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
