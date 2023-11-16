import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GiftCertificateModule } from './gift-certificate/gift-certificate.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GiftCertificateModule, TagModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
