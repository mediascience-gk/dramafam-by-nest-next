import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { StaticReviewRepository as Repository } from '../../interface-adapter/gateways/review/review.repository';

const { allAge, allGender } = Repository;

const Age = {
  ...allAge,
} as const;
type Age = typeof Age[keyof typeof Age];

const Gender = {
  ...allGender,
} as const;
type Gender = typeof Gender[keyof typeof Gender];

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
