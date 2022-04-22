import { Injectable } from '@nestjs/common';
import { StaticCommentRepository } from '../interface-adapter/gateways/comment/comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '../models/comment/comment';

@Injectable()
export class CommentService {
  constructor(private commentRepository: StaticCommentRepository) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentRepository.create(createCommentDto);
  }

  async findAllByDramaId(dramaId: number): Promise<Comment[]> {
    return await this.commentRepository.findAllByDramaId(dramaId);
  }

  async findOne(id: number): Promise<Comment> {
    return await this.commentRepository.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
