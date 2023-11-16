import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateGiftCertificateDto {
  @IsOptional()
  @IsString()
  @Min(8)
  code?: string;

  @IsInt()
  @Min(0)
  maximumUsage: number;

  @IsOptional()
  @IsString()
  @IsArray()
  @Min(1)
  tags?: string[];
}
