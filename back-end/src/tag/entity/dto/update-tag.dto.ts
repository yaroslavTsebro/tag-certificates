import { IsString, Min } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @Min(3)
  name: string;
}
