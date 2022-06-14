import { DramaPresentation } from '../drama/drama';
import { Age } from '../drama/dtos/enums/age.enum';
import { Gender } from '../drama/dtos/enums/gender.enum';
import { Rating } from '../drama/rating';

export class Review {
  constructor(
    public readonly id: number,
    public readonly body: string,
    public readonly drama: DramaPresentation,
  ) {}

  public commentator: string;
  public age: Age;
  public gender: Gender;
  public rating: Rating;
}
