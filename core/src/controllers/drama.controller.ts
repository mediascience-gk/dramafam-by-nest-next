import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DramaService } from '../services/drama.service';
import { CreateDramaDto } from '../services/dto/create-drama.dto';
import { Drama } from '../models/drama/drama';
import { ReviewService } from '../services/review.service';

@Controller('drama')
export class DramaController {
  constructor(
    private readonly dramaService: DramaService,
    private readonly reviewService: ReviewService,
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
    const comments = await this.reviewService.findAllByDramaId(id);
    return { drama, comments };
  }
}
