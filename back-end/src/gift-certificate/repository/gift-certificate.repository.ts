import { TypeOrmAbstractRepository } from '@app/common';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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

  async create(entity: GiftCertificate): Promise<GiftCertificate> {
    return this.entityManager.save(new GiftCertificate({ ...entity }));
  }

  async findAll(): Promise<GiftCertificate[]> {
    try {
      return await this.itemsRepository.find({ relations: ['tags'] });
    } catch (error) {
      this.logger.warn('Cant find such certificates');
      throw new InternalServerErrorException(`Cant find this certificates`);
    }
  }

  async findAndUpdate(entity: GiftCertificate) {
    const updateResult = await this.itemsRepository.save(entity, {
      reload: true,
    });

    if (!updateResult) {
      throw new NotFoundException('Entity wasnt update.');
    }

    return updateResult;
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
}
