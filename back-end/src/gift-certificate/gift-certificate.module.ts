import { Module } from '@nestjs/common';
import GiftCertificate from './entity/gift-certificate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCertificateService } from './service/gift-certificate.service';
import { GIFT_CERTIFICATE_SERVICE } from './service/gift-certificate-service.interface';
import { GiftCertificateRepository } from './repository/gift-certificate.repository';
import { GiftCertificateController } from './controller/gift-certificate.controller';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GiftCertificate]),
    TypeOrmModule,
    TagModule,
  ],
  providers: [
    {
      useClass: GiftCertificateService,
      provide: GIFT_CERTIFICATE_SERVICE,
    },
    GiftCertificateRepository,
  ],
  controllers: [GiftCertificateController],
})
export class GiftCertificateModule {}
