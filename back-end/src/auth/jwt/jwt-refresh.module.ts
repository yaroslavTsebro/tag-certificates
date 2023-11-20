import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_REFRESH_SECRET'),
        signOptions: {
          expiresIn: `${config.get<string>('JWT_REFRESH_EXPIRATION')}s`,
        },
      }),
    }),
  ],
  providers: [
    {
      provide: 'JwtRefreshTokenService',
      useExisting: JwtService,
    },
  ],
  exports: ['JwtRefreshTokenService'],
})
export class JwtRefreshModule {}
