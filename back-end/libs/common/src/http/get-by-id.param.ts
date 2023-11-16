import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetById {
  @IsString()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
