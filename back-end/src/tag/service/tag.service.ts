import { Injectable, Inject } from '@nestjs/common';
import { TagRepository } from '../repository/tag.repository';
import { ITagService } from './tag-service.interface';
import User from 'src/auth/user/entity/user.entity';
import { CreateTagDto } from '../entity/dto/create-tag.dto';
import { UpdateTagDto } from '../entity/dto/update-tag.dto';
import Tag from '../entity/tag.entity';

@Injectable()
export class TagService implements ITagService {
  constructor(
    @Inject(TagRepository)
    private readonly tagRepository: TagRepository,
  ) {}

  async getByNameLike(name: string): Promise<Tag[]> {
    return await this.tagRepository.getByNameLike(name);
  }

  async create(dto: CreateTagDto, user: User): Promise<Tag> {
    return await this.tagRepository.createTag(dto, user.id);
  }

  async getById(id: number): Promise<Tag> {
    return await this.tagRepository.getById(id);
  }

  async delete(id: number): Promise<number> {
    return await this.tagRepository.deleteById(id);
  }

  async update(dto: UpdateTagDto, id: number): Promise<Tag> {
    return await this.tagRepository.findOneAndUpdate(
      { id },
      { name: dto.name },
    );
  }
  async getTagsCreatedByUser(user: User): Promise<Tag[]> {
    return await this.tagRepository.getTagsCreatedByUser(user.id);
  }
}
