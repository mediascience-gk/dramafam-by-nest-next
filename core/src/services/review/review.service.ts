import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../../models/review/dtos/create-review.dto';
import { Review } from '../../models/review/review';
import { Request } from 'express';
import { ReviewRepository } from '../../models/review/review.repository';

@Injectable()
export class ReviewService {
  constructor(private reviewRepository: ReviewRepository) {}

  async create(
    createCommentDto: CreateReviewDto,
    request: Request,
  ): Promise<Review> {
    return await this.reviewRepository.create(createCommentDto);
  }

  async findAllByDramaId(dramaId: number): Promise<Review[]> {
    return await this.reviewRepository.findAllByDramaId(dramaId);
  }

  async findOne(id: number): Promise<Review> {
    return await this.reviewRepository.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
