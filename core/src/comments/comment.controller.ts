import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentModel } from '../entities/comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentModel> {
    return await this.commentService.create(createCommentDto);
  }

  @Get()
  async index() {
    return await this.commentService.findAll();
  }
}
