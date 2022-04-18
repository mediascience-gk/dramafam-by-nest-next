import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    return await this.commentService.create(createCommentDto);
  }

  @Get()
  async index() {
    return await this.commentService.findAll();
  }
}
