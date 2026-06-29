import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
declare const GoogleStrategy_base: new (...args: [options: import("passport-google-oauth20").StrategyOptionsWithRequest] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<{
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
export {};
