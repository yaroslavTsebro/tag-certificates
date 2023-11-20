import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GiftCertificateService } from '../service/gift-certificate.service';
import { GIFT_CERTIFICATE_SERVICE } from '../service/gift-certificate-service.interface';
import User from 'src/auth/user/entity/user.entity';
import { CreateGiftCertificateDto } from '../entity/dto/create-gift-certificate.dto';
import { UpdateGiftCertificateDto } from '../entity/dto/update-gift-certificate.dto';
import GiftCertificate from '../entity/gift-certificate.entity';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { CurrentUser } from '@app/common';

@Controller('gift-certificate')
export class GiftCertificateController {
  constructor(
    @Inject(GIFT_CERTIFICATE_SERVICE)
    private readonly giftCertificateService: GiftCertificateService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(
    @Body() dto: CreateGiftCertificateDto,
    @CurrentUser() user: User,
  ): Promise<GiftCertificate> {
    return await this.giftCertificateService.create(dto, user);
  }

  @Get('code/:code')
  async getByCode(@Param('code') code: string): Promise<GiftCertificate> {
    return await this.giftCertificateService.getByCode(code);
  }

  @Get()
  async getAll(): Promise<GiftCertificate[]> {
    return await this.giftCertificateService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<GiftCertificate> {
    return await this.giftCertificateService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.giftCertificateService.delete(id);
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard)
  async update(
    @Body() dto: UpdateGiftCertificateDto,
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<GiftCertificate> {
    return await this.giftCertificateService.update(dto, id, user);
  }
}
