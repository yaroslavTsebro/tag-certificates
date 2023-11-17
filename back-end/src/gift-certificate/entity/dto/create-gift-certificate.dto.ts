import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateGiftCertificateDto {
  /**
   * A custom code for this certificate
   * @example 'microsoft123'
   */
  @IsOptional()
  @IsString()
  @Min(8)
  code?: string;

  /**
   * A count of  maximum usage
   * @example 100
   */
  @IsInt()
  @Min(0)
  maximumUsage: number;

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
