import { Drama } from '../drama/drama';
import { Age } from '../../services/drama/dtos/enums/age.enum';
import { Gender } from '../../services/drama/dtos/enums/gender.enum';

export class Review {
  constructor(
    public readonly id: number,
    public readonly body: string,
    public readonly drama: Drama,
  ) {}

  public commentator: string;
  public age: Age;
  public gender: Gender;
  public ratingOfGeneral: number;
  public ratingOfCast: number;
  public ratingOfStory: number;
  public ratingOfProduction: number;
  public ratingOfMusic: number;
  public ratingOfComedy: number;
  public ratingOfImpression: number;
  public ratingOfThrill: number;
}
