import { Body, Controller, Post, Req } from '@nestjs/common';
import { ReviewService } from '../services/review/review.service';
import { CreateReviewDto } from '../models/review/dtos/create-review.dto';
import { Review } from '../models/review/review';
import { Request } from 'express';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Req() request: Request,
  ): Promise<Review> {
    return await this.reviewService.create(createReviewDto, request);
  }
}
