import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DramaService } from '../services/drama/drama.service';
import { CreateDramaDto } from '../models/drama/dtos/create-drama.dto';
import { Drama } from '../models/drama/drama';

@Controller('drama')
export class DramaController {
  constructor(private readonly dramaService: DramaService) {}

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
    return drama;
  }
}
