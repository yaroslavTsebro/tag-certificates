import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateGiftCertificateDto {
  /**
   * A custom code for this certificate
   * @example 'microsoft123'
   */
  @IsOptional()
  @IsString()
  @Length(8)
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
  @IsArray()
  @IsString({ each: true, message: 'Each tag must be a string', always: true })
  tags?: string[];
}
