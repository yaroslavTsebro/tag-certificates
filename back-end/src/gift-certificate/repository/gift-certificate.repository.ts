import { TypeOrmAbstractRepository } from '@app/common';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import GiftCertificate from '../entity/gift-certificate.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GiftCertificateRepository extends TypeOrmAbstractRepository<GiftCertificate> {
  protected readonly logger = new Logger(GiftCertificateRepository.name);

  constructor(
    @InjectRepository(GiftCertificate)
    giftCertificateRepository: Repository<GiftCertificate>,
    entityManager: EntityManager,
  ) {
    super(giftCertificateRepository, entityManager);
  }

  async findById(id: number): Promise<GiftCertificate | null> {
    try {
      return await this.itemsRepository.findOneBy({ id });
    } catch (error) {
      this.logger.warn('Cant find such certificate by id: ', id);
      throw new InternalServerErrorException(`Cant find this certificate`);
    }
  }

  async findByCode(code: string): Promise<GiftCertificate | null> {
    try {
      return await this.itemsRepository.findOneBy({ code });
    } catch (error) {
      this.logger.warn('Cant find such certificate by code: ', code);
      throw new InternalServerErrorException(`Cant find this certificate`);
    }
  }

  async deleteById(id: number): Promise<number> {
    try {
      return (await this.itemsRepository.delete({ id })).affected;
    } catch (error) {
      this.logger.warn('Cant delete such certificate by id: ', id);
      throw new InternalServerErrorException(`Cant delete this certificate`);
    }
  }

  async update(id: number): Promise<number> {
    try {
      return (await this.itemsRepository.delete({ id })).affected;
    } catch (error) {
      this.logger.warn('Cant delete such certificate by id: ', id);
      throw new InternalServerErrorException(`Cant delete this certificate`);
    }
  }
}
