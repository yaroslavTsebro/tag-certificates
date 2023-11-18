import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { TAG_SERVICE } from '../service/tag-service.interface';
import { TagService } from '../service/tag.service';
import { CurrentUser } from '@app/common';
import User from 'src/auth/user/entity/user.entity';
import { CreateTagDto } from '../entity/dto/create-tag.dto';
import { UpdateTagDto } from '../entity/dto/update-tag.dto';
import Tag from '../entity/tag.entity';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';

@Controller('tag')
export class TagController {
  constructor(@Inject(TAG_SERVICE) private readonly tagService: TagService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(
    @Body() dto: CreateTagDto,
    @CurrentUser() user: User,
  ): Promise<Tag> {
    return await this.tagService.create(dto, user);
  }

  @Get('created-by-me')
  @UseGuards(AccessTokenGuard)
  async getTagsCreatedByUser(@CurrentUser() user: User): Promise<Tag[]> {
    return await this.tagService.getTagsCreatedByUser(user);
  }

  @Get('name-like/:name')
  async getByNameLike(@Param('name') name: string): Promise<Tag[]> {
    return await this.tagService.getByNameLike(name);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Tag> {
    return await this.tagService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.tagService.delete(id);
  }

  @Put(':id')
  async update(
    @Body() dto: UpdateTagDto,
    @Param('id') id: number,
  ): Promise<Tag> {
    return await this.tagService.update(dto, id);
  }
}
