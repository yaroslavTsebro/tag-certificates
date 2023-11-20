import { IsString, Length } from 'class-validator';

export class UpdateTagDto {
  /**
   * A name of tag
   * @example 'shopping'
   */
  @IsString()
  @Length(3)
  name: string;
}
