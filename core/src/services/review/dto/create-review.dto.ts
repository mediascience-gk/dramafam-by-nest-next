import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { Age, allAge } from '../../drama/dtos/enums/age.enum';
import { Gender, allGender } from '../../drama/dtos/enums/gender.enum';

export class CreateReviewDto {
  @IsString()
  commentator: string | null;

  @IsEnum(allAge)
  age: Age | null;

  @IsEnum(allGender)
  gender: Gender | null;

  @Expose()
  ratingOfGeneral: number | null;

  @Expose()
  ratingOfStory: number | null;

  @Expose()
  ratingOfCast: number | null;

  @Expose()
  ratingOfProduction: number | null;

  @Expose()
  ratingOfMusic: number | null;

  @Expose()
  ratingOfImpression: number | null;

  @Expose()
  ratingOfComedy: number | null;

  @Expose()
  ratingOfThrill: number | null;

  @IsString()
  @IsNotEmpty()
  body: string;

  @Expose()
  dramaId: number;
}
