import User from 'src/auth/user/entity/user.entity';
import { CreateGiftCertificateDto } from '../entity/dto/create-gift-certificate.dto';
import { UpdateGiftCertificateDto } from '../entity/dto/update-gift-certificate.dto';
import GiftCertificate from '../entity/gift-certificate.entity';

export const GIFT_CERTIFICATE_SERVICE = Symbol('IGiftCertificateService');

export interface IGiftCertificateService {
  create(dto: CreateGiftCertificateDto, user: User): Promise<GiftCertificate>;
  getById(id: number): Promise<GiftCertificate>;
  getByCode(code: string): Promise<GiftCertificate>;
  delete(id: number): Promise<number>;
  update(
    dto: UpdateGiftCertificateDto,
    id: number,
    user: User,
  ): Promise<GiftCertificate>;
}
