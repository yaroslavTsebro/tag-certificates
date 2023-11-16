import User from 'src/auth/user/entity/user.entity';
import { CreateTagDto } from '../entity/dto/create-tag.dto';
import { UpdateTagDto } from '../entity/dto/update-tag.dto';
import Tag from '../entity/tag.entity';

export const TAG_CONTROLLER = Symbol('ITagController');

export interface ITagController {
  create(dto: CreateTagDto, user: User): Promise<Tag>;
  getById(id: number): Promise<Tag>;
  getByNameLike(name: string): Promise<Tag[]>;
  delete(id: number): Promise<number>;
  update(dto: UpdateTagDto, id: number): Promise<Tag>;
  getTagsCreatedByUser(user: User): Promise<Tag[]>;
}
