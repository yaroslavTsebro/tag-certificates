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
  @IsArray()
  @IsString({ each: true, message: 'Each tag must be a string', always: true })
  tags?: string[];
}
