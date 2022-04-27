import { Injectable } from '@nestjs/common';
import { StaticReviewRepository } from '../interface-adapter/gateways/review/review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '../models/review/review';

@Injectable()
export class ReviewService {
  constructor(private commentRepository: StaticReviewRepository) {}

  async create(createCommentDto: CreateReviewDto): Promise<Review> {
    return await this.commentRepository.create(createCommentDto);
  }

  async findAllByDramaId(dramaId: number): Promise<Review[]> {
    return await this.commentRepository.findAllByDramaId(dramaId);
  }

  async findOne(id: number): Promise<Review> {
    return await this.commentRepository.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
