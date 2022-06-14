import { Review } from './review';
import { CreateReviewDto } from './dtos/create-review.dto';
import { Rating } from '../drama/rating';

export abstract class ReviewRepository {
  abstract findById: (id: number) => Promise<Review>;

  abstract create: (createCommentDto: CreateReviewDto) => Promise<Review>;

  abstract findAllByDramaId: (dramaId: number) => Promise<Review[]>;

  abstract getRating: (dramaId: number) => Promise<Rating>;

  abstract delete: (id: number) => Promise<void>;
}
