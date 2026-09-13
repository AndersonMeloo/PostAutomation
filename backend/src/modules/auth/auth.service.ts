import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Platform, User } from '@prisma/client';
import { google } from 'googleapis';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

type GoogleOAuthProfile = {
  id: string;
  displayName?: string;
  emails?: Array<{ value?: string }>;
};

type YoutubeConnectStatePayload = {
  sub: string;
  purpose: 'youtube-connect';
};

const YOUTUBE_CONNECT_SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.readonly',
];

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(userId: string, email: string, role: string | null) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.userService.updateRefreshToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Login/cadastro no SaaS via Google. Nao concede nem depende de escopos do
   * YouTube - a conexao do canal e feita separadamente em getYoutubeConnectUrl.
   */
  async validateGoogleUser(profile: GoogleOAuthProfile): Promise<User> {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      throw new UnauthorizedException(
        'Nao foi possivel recuperar o email da conta Google',
      );
    }

    return this.userService.findOrCreateGoogleUser({
      email,
      googleId: profile.id,
      name: profile.displayName || null,
    });
  }

  async loginWithGoogle(user: User) {
    return this.generateTokens(user.id, user.email, user.role);
  }

  /**
   * Gera a URL de consentimento do Google para conectar o canal do YouTube
   * de um usuario ja autenticado no SaaS. Independente do login por Google.
   */
  getYoutubeConnectUrl(userId: string): string {
    const oauth2Client = this.buildGoogleOAuthClient(
      this.getYoutubeCallbackUrl(),
    );

    const state = this.jwtService.sign(
      { sub: userId, purpose: 'youtube-connect' } as YoutubeConnectStatePayload,
      { expiresIn: '10m' },
    );

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: true,
      scope: YOUTUBE_CONNECT_SCOPES,
      state,
    });
  }

  /**
   * Troca o code retornado pelo Google por tokens e vincula o canal do
   * YouTube ao usuario identificado no state, usando o `sub` do Google
   * (nao o e-mail) como identificador da conta conectada.
   */
  async connectYoutubeAccount(code: string, state: string): Promise<void> {
    let userId: string;

    try {
      const payload =
        this.jwtService.verify<YoutubeConnectStatePayload>(state);

      if (payload.purpose !== 'youtube-connect') {
        throw new Error('Purpose invalido');
      }

      userId = payload.sub;
    } catch {
      throw new UnauthorizedException(
        'Nao foi possivel validar a solicitacao de conexao com o YouTube',
      );
    }

    const oauth2Client = this.buildGoogleOAuthClient(
      this.getYoutubeCallbackUrl(),
    );
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.id_token || !tokens.access_token) {
      throw new UnauthorizedException(
        'Nao foi possivel identificar a conta Google conectada',
      );
    }

    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
    });
    const googleAccountId = ticket.getPayload()?.sub;

    if (!googleAccountId) {
      throw new UnauthorizedException('Conta Google sem identificador valido');
    }

    await this.userService.upsertSocialAccount({
      userId,
      platform: Platform.YOUTUBE,
      providerAccountId: googleAccountId,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
    });
  }

  private buildGoogleOAuthClient(redirectUri: string) {
    const clientID = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'GOOGLE_CLIENT_SECRET',
    );

    if (!clientID || !clientSecret) {
      throw new Error(
        'GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET nao configurados',
      );
    }

    return new google.auth.OAuth2(clientID, clientSecret, redirectUri);
  }

  private getYoutubeCallbackUrl(): string {
    const callbackUrl = this.configService.get<string>(
      'GOOGLE_YOUTUBE_CALLBACK_URL',
    );

    if (!callbackUrl) {
      throw new Error('GOOGLE_YOUTUBE_CALLBACK_URL nao configurada');
    }

    return callbackUrl;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return this.generateTokens(user.id, user.email, user.role);

    // const payload = {
    //   sub: user.id,
    //   email: user.email,
    //   role: user.role,
    // };

    // const token = this.jwtService.sign(payload);

    // return {
    //   token,
    //   // expiresIn: 3600, // 1 hora
    // };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);

      const user = await this.userService.getUserIfRefreshTokenMatches(
        payload.sub,
        token,
      );

      if (!user) {
        throw new UnauthorizedException('Token de refresh inválido');
      }

      return this.generateTokens(user.id, user.email, user.role);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
