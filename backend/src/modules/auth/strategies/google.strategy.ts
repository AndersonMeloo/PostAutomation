import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { getGoogleOAuthConfig } from 'src/config/google.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly authService: AuthService;

  constructor(configService: ConfigService, authService: AuthService) {
    const googleConfig = getGoogleOAuthConfig(configService);
    const strategyOptions = {
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
    };

    super(strategyOptions);

    this.authService = authService;
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    return this.authService.validateGoogleUser(
      profile,
      _accessToken,
      _refreshToken,
    );
  }
}
