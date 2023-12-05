import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { GoogleGuard } from '../guard/oauth/google.guard';
import { AuthService, Tokens } from '../service/auth.service';
import { AuthType } from '../user/entity/user.entity';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.registerOrAuthUsingOauth(
      AuthType.GOOGLE,
      req.user,
    );

    this.addTokensToCookies(response, result.tokens);
    result.user.token = null;
    response.send(result.user);
  }

  private addTokenToCookies(
    response: Response,
    key: string,
    token: string,
    expires: Date,
  ) {
    response.cookie(key, token, {
      httpOnly: true,
      expires: expires,
    });
  }

  private addAccessTokenToCookies(response: Response, token: string) {
    const accessTokenExpires = new Date();
    accessTokenExpires.setSeconds(
      accessTokenExpires.getSeconds() +
        this.configService.get<number>('JWT_ACCESS_EXPIRATION'),
    );
    this.addTokenToCookies(
      response,
      'Authentication',
      token,
      accessTokenExpires,
    );
  }

  private addRefreshTokenToCookies(response: Response, token: string) {
    const refreshTokenExpires = new Date();
    refreshTokenExpires.setSeconds(
      refreshTokenExpires.getSeconds() +
        this.configService.get<number>('JWT_REFRESH_EXPIRATION'),
    );
    this.addTokenToCookies(
      response,
      'refreshToken',
      token,
      refreshTokenExpires,
    );
  }

  private addTokensToCookies(response: Response, tokens: Tokens) {
    this.addAccessTokenToCookies(response, tokens.accessToken);
    this.addRefreshTokenToCookies(response, tokens.refreshToken);
  }
}
