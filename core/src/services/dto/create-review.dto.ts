import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { StaticReviewRepository as Repository } from '../../interface-adapter/gateways/review/review.repository';
import {
  Age,
  AllAge,
} from '../../interface-adapter/gateways/entities/enum/age.enum';
import {
  AllGender,
  Gender,
} from '../../interface-adapter/gateways/entities/enum/gender.enum';

export class CreateReviewDto {
  @IsString()
  commentator: string | null;

  @IsEnum(AllAge)
  age: Age | null;

  @IsEnum(AllGender)
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
