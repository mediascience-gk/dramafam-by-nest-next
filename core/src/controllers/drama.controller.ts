import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DramaService } from '../services/drama/drama.service';
import { CreateDramaDto } from '../services/drama/dtos/create-drama.dto';
import { Drama } from '../models/drama/drama';
import { ReviewService } from '../services/review/review.service';
import { AvgOfDramaRatingService } from '../services/drama/avg-of-drama-rating.service';

@Controller('drama')
export class DramaController {
  constructor(
    private readonly dramaService: DramaService,
    private readonly reviewService: ReviewService,
    private readonly avgOfDramaRating: AvgOfDramaRatingService,
  ) {}

  @Post()
  async create(@Body() createDramaDto: CreateDramaDto): Promise<Drama> {
    return await this.dramaService.create(createDramaDto);
  }

  @Get()
  index(): Promise<Drama[]> {
    return this.dramaService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    const drama = await this.dramaService.findById(id);
    console.log(drama.reviews());
    const reviews = await this.reviewService.findAllByDramaId(id);
    const avg = await this.avgOfDramaRating.get(id);
    return { drama, reviews, avg };
  }
}
