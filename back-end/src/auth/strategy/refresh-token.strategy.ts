import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { Injectable } from '@nestjs/common';
import { RefreshTokenPayload } from '../entity/refresh-token-payload.interface';
import User from '../user/entity/user.entity';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.refreshToken;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const refreshToken = request.cookies.refreshToken;
    return this.authService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.id,
    );
  }
}
