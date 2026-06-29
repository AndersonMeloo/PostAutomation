import { ConfigService } from '@nestjs/config';
export interface GoogleOAuthConfig {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
}
export declare function getGoogleOAuthConfig(configService: ConfigService): GoogleOAuthConfig;
