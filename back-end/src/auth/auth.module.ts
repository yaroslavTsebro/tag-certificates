import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { TokenModule } from './token/token.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { LoggerModule } from '@app/common';
import { UsersModule } from './user/user.module';
import { JwtAccessModule } from './jwt/jwt-access.module';
import { JwtRefreshModule } from './jwt/jwt-refresh.module';

@Module({
  imports: [
    LoggerModule,
    TokenModule,
    UsersModule,
    JwtAccessModule,
    JwtRefreshModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
