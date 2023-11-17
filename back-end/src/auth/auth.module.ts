import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { TokenModule } from './token/token.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { LoggerModule } from '@app/common';
import { UsersModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule,
    TokenModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: `${config.get('JWT_ACCESS_EXPIRATION')}`,
          },
        };
      },
    }),
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
