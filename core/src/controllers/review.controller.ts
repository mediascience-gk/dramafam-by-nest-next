import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../services/dto/create-review.dto';
import { Review } from '../models/review/review';

@Controller('review')
export class ReviewController {
  constructor(private readonly commentService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.commentService.create(createReviewDto);
  }
}
