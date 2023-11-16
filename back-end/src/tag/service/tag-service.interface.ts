import User from 'src/auth/user/entity/user.entity';
import Tag from '../entity/tag.entity';
import { UpdateTagDto } from '../entity/dto/update-tag.dto';
import { CreateTagDto } from '../entity/dto/create-tag.dto';

export const TAG_SERVICE = Symbol('ITagService');

export interface ITagService {
  create(dto: CreateTagDto, user: User): Promise<Tag>;
  getById(id: number): Promise<Tag>;
  getByNameLike(name: string): Promise<Tag[]>;
  delete(id: number): Promise<number>;
  update(dto: UpdateTagDto, id: number): Promise<Tag>;
  getTagsCreatedByUser(user: User): Promise<Tag[]>;
}
