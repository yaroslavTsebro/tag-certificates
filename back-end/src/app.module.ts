import { Module } from '@nestjs/common';
import { GiftCertificateModule } from './gift-certificate/gift-certificate.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './auth/user/entity/user.entity';
import Token from './auth/token/entity/token.entity';
import Tag from './tag/entity/tag.entity';
import GiftCertificate from './gift-certificate/entity/gift-certificate.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    GiftCertificateModule,
    TagModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRATION: Joi.string().required(),
        JWT_REFRESH_EXPIRATION: Joi.string().required(),
        PORT: Joi.number().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [User, Token, Tag, GiftCertificate],
          synchronize: true,
        } as PostgresConnectionOptions;
      },
    }),
  ],
})
export class AppModule {}
