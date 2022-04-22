import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @Expose()
  dramaId: number;
}
