import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
type GoogleAuthRequest = {
    user: User;
};
type RedirectResponse = {
    redirect: (url: string) => void;
};
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    googleAuth(): void;
    googleAuthTest(accessToken?: string, refreshToken?: string, provider?: string): {
        message: string;
        provider: string | undefined;
        accessToken: string | undefined;
        refreshToken: string | undefined;
    };
    googleAuthRedirect(req: GoogleAuthRequest, res: RedirectResponse): Promise<void>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
export {};
