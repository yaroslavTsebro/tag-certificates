import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateGiftCertificateDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  maximumUsage?: number;

  @IsOptional()
  @IsString()
  @IsArray()
  @Min(1)
  tags?: string[];
}
