import { IsString, Min } from 'class-validator';

export class UpdateTagDto {
  /**
   * A name of tag
   * @example 'shopping'
   */
  @IsString()
  @Min(3)
  name: string;
}
