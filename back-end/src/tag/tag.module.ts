import { Module } from '@nestjs/common';
import Tag from './entity/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './service/tag.service';
import { TAG_SERVICE } from './service/tag-service.interface';
import { TagRepository } from './repository/tag.repository';
import { TagController } from './controller/tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), TypeOrmModule],
  providers: [
    {
      useClass: TagService,
      provide: TAG_SERVICE,
    },
    TagRepository,
  ],
  controllers: [TagController],
  exports: [TagRepository],
})
export class TagModule {}
