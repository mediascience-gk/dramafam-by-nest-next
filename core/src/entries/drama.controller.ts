import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DramaService } from './drama.service';
import { DramaEntity } from '../entities/drama.entity';
import { CreateDramaDto } from './dto/create-drama.dto';

@Controller('drama')
export class DramaController {
  constructor(private readonly dramaService: DramaService) {}

  @Post()
  async create(@Body() createDramaDto: CreateDramaDto): Promise<DramaEntity> {
    return await this.dramaService.create(createDramaDto);
  }

  @Get()
  index(): Promise<DramaEntity[]> {
    return this.dramaService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<DramaEntity | undefined> {
    return this.dramaService.findOne(id);
    /**
     * const drama = await this.dramaService.findOne(id);
     * const comments = await this.commentService.findAll();
     * const contents = {
     *   drama: drama,
     *   comments: comments,
     * };
     * console.log(drama, comments);
     * return this.commentService.findAll();
     */
  }
}
