import { Review } from './review';
import { CreateReviewDto } from '../../services/dto/create-review.dto';

export interface ReviewRepository {
  findById(id: number): Promise<Review>;

  create(createCommentDto: CreateReviewDto): Promise<Review>;

  findAllByDramaId(dramaId: number): Promise<Review[]>;

  delete(id: number): Promise<void>;
}
