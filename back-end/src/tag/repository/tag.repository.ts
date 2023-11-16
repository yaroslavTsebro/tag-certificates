import { TypeOrmAbstractRepository } from '@app/common';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In, Like } from 'typeorm';
import Tag from '../entity/tag.entity';
import { CreateTagDto } from '../entity/dto/create-tag.dto';

@Injectable()
export class TagRepository extends TypeOrmAbstractRepository<Tag> {
  protected readonly logger = new Logger(TagRepository.name);

  constructor(
    @InjectRepository(Tag)
    tagRepository: Repository<Tag>,
    entityManager: EntityManager,
  ) {
    super(tagRepository, entityManager);
  }

  async getByNameLike(name: string): Promise<Tag[]> {
    try {
      return await this.itemsRepository.findBy({ name: Like(`%${name}%`) });
    } catch (e) {
      this.logger.warn('Tags not found with such tag name', name);
      throw new NotFoundException('Tags not found.');
    }
  }

  async bulkSearchByName(tagNames: string[]): Promise<Tag[]> {
    try {
      return await this.itemsRepository.findBy({ name: In(tagNames) });
    } catch (e) {
      this.logger.warn('Tags not found with such tag names', tagNames);
      throw new NotFoundException('Tags not found.');
    }
  }

  async bulkCreate(tagNames: string[], userId: number): Promise<Tag[]> {
    try {
      const tags = tagNames.map((name) => ({ name: name, user: userId }));
      return await this.itemsRepository.create(tags);
    } catch (e) {
      this.logger.warn('Tags was not created with such data', tagNames, userId);
      throw new InternalServerErrorException('Tags wasnt.');
    }
  }

  async createTag(dto: CreateTagDto, userId: number): Promise<Tag> {
    try {
      return await this.itemsRepository.create({
        ...dto,
        creator: { id: userId },
      });
    } catch (e) {
      this.logger.warn('Tag was not created with such data', dto, userId);
      throw new InternalServerErrorException('Tag wasnt created.');
    }
  }

  async getById(id: number): Promise<Tag> {
    try {
      return await this.itemsRepository.findOneBy({ id: id });
    } catch (e) {
      this.logger.warn('Tag was not found with such data', id);
      throw new InternalServerErrorException('Tag was not found.');
    }
  }

  async deleteById(id: number): Promise<number> {
    try {
      return (await this.itemsRepository.delete({ id: id })).affected;
    } catch (e) {
      this.logger.warn('Tag was not found with such data', id);
      throw new InternalServerErrorException('Tag was not found.');
    }
  }

  async getTagsCreatedByUser(id: number): Promise<Tag[]> {
    try {
      return await this.itemsRepository.findBy({ creator: { id: id } });
    } catch (e) {
      this.logger.warn('Tag was not found with such data', id);
      throw new InternalServerErrorException('Tag was not found.');
    }
  }
}
