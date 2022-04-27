import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @Expose()
  dramaId: number;
}
