import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGiftCertificateService } from './gift-certificate-service.interface';
import { GiftCertificateRepository } from '../repository/gift-certificate.repository';
import { CreateGiftCertificateDto } from '../entity/dto/create-gift-certificate.dto';
import { UpdateGiftCertificateDto } from '../entity/dto/update-gift-certificate.dto';
import GiftCertificate from '../entity/gift-certificate.entity';
import { v4 as uuid } from 'uuid';
import { TagRepository } from 'src/tag/repository/tag.repository';
import User from 'src/auth/user/entity/user.entity';

@Injectable()
export class GiftCertificateService implements IGiftCertificateService {
  constructor(
    @Inject(GiftCertificateRepository)
    private readonly giftCertificateRepository: GiftCertificateRepository,
    @Inject(TagRepository)
    private readonly tagRepository: TagRepository,
  ) {}

  async create(
    dto: CreateGiftCertificateDto,
    user: User,
  ): Promise<GiftCertificate> {
    const certificate = new GiftCertificate({
      maximumUsage: dto.maximumUsage,
      creator: user,
    });
    certificate.code = dto.code ? dto.code : uuid();

    if (dto.tags) {
      const existingTags = await this.tagRepository.bulkSearchByName(dto.tags);

      const existingTagNames = existingTags.map((tag) => tag.name);
      const newTagNames = dto.tags.filter(
        (tagName) => !existingTagNames.includes(tagName),
      );

      let newTags;
      if (newTagNames.length > 0) {
        newTags = await this.tagRepository.bulkCreate(newTagNames, user.id);
      }
      certificate.tags = [...existingTags, ...newTags];
    }

    return this.giftCertificateRepository.create(certificate);
  }

  async getById(id: number): Promise<GiftCertificate> {
    const certificate = await this.giftCertificateRepository.findById(id);

    if (certificate) return certificate;
    throw new NotFoundException('Entity not found.');
  }

  async getByCode(code: string): Promise<GiftCertificate> {
    const certificate = await this.giftCertificateRepository.findByCode(code);

    if (certificate) return certificate;
    throw new NotFoundException('Entity not found.');
  }

  async delete(id: number): Promise<number> {
    return await this.giftCertificateRepository.deleteById(id);
  }

  async update(
    dto: UpdateGiftCertificateDto,
    id: number,
    user: User,
  ): Promise<GiftCertificate> {
    const certificate = await this.getById(id);

    if (dto.maximumUsage) certificate.maximumUsage = dto.maximumUsage;

    if (dto.tags) {
      const connectedTags = certificate.tags.map((tag) => tag.name);

      const notConnected = dto.tags.filter(
        (tagName) => !connectedTags.includes(tagName),
      );
      const existingTags =
        await this.tagRepository.bulkSearchByName(notConnected);

      const existingTagNames = existingTags.map((tag) => tag.name);
      let nonExistingTags = [...dto.tags];
      nonExistingTags = nonExistingTags.filter(
        (tagName) => !existingTagNames.includes(tagName),
      );

      let newTags;
      if (nonExistingTags.length > 0) {
        newTags = await this.tagRepository.bulkCreate(nonExistingTags, user.id);
      }

      certificate.tags = [...existingTags, ...newTags];
    }

    return await this.giftCertificateRepository.findOneAndUpdate(
      { id },
      { ...certificate },
    );
  }
}
