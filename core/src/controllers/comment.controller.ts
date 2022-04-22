import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../services/dto/create-comment.dto';
import { Comment } from '../models/comment/comment';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentService.create(createCommentDto);
  }
}
