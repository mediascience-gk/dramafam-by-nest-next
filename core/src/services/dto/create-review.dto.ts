import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { Age, allAge } from './enum/age.enum';
import { Gender, allGender } from './enum/gender.enum';

export class CreateReviewDto {
  @IsString()
  commentator: string | null;

  @IsEnum(allAge)
  age: Age | null;

  @IsEnum(allGender)
  gender: Gender | null;

  @IsInt()
  ratingOfGeneral: number | null;

  @IsInt()
  ratingOfStory: number | null;

  @IsInt()
  ratingOfCast: number | null;

  @IsInt()
  ratingOfProduction: number | null;

  @IsInt()
  ratingOfMusic: number | null;

  @IsInt()
  ratingOfImpression: number | null;

  @IsInt()
  ratingOfComedy: number | null;

  @IsInt()
  ratingOfThrill: number | null;

  @IsString()
  @IsNotEmpty()
  body: string;

  @Expose()
  dramaId: number;
}
