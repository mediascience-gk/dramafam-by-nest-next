import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../entities/comment.entity';
import { DramaService } from '../entries/drama.service';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private commentsRepository: CommentRepository,
    private dramaService: DramaService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    const { dramaId } = createCommentDto;
    const drama = await this.dramaService.findOne(dramaId);
    return await this.commentsRepository.createComment(createCommentDto, drama);
  }

  findAll() {
    return this.commentsRepository.find({
      select: ['id', 'body'],
      relations: ['drama'],
      where: {
        drama: { id: 1 },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CommentEntity | undefined> {
    return await this.commentsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
