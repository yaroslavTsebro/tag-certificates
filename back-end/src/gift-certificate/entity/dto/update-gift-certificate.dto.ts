import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateGiftCertificateDto {
  /**
   * A count of  maximum usage
   * @example 100
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  maximumUsage?: number;

  /**
   * A list of tags for this certificate
   * @example ['shopping', 'food', 'drinks']
   */
  @IsOptional()
  @IsString()
  @IsArray()
  @Min(1)
  tags?: string[];
}
