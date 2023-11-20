import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: `${config.get<string>('JWT_ACCESS_EXPIRATION')}s`,
        },
      }),
    }),
  ],
  providers: [
    {
      provide: 'JwtAccessTokenService',
      useExisting: JwtService,
    },
  ],
  exports: ['JwtAccessTokenService'],
})
export class JwtAccessModule {}
