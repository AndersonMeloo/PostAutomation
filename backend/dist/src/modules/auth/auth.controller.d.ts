import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
type GoogleAuthRequest = {
    user: User;
};
type AuthenticatedRequest = {
    user: JwtPayload;
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
    getYoutubeConnectUrl(req: AuthenticatedRequest): {
        url: string;
    };
    youtubeConnectCallback(code: string, state: string, error: string | undefined, res: RedirectResponse): Promise<void>;
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
