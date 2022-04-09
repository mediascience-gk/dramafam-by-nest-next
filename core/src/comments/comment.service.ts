import { Injectable } from '@nestjs/common';
import { CommentModel } from '../entities/comment.model';
import { EntryService } from '../entries/entry.service';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private commentsRepository: CommentRepository,
    private entryService: EntryService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentModel> {
    const { entryId } = createCommentDto;
    const entry = await this.entryService.findOne(entryId);
    return await this.commentsRepository.createComment(createCommentDto, entry);
  }

  findAll() {
    return this.commentsRepository.find({
      select: ['id', 'body'],
      relations: ['entry'],
      where: {
        entry: { id: 1 },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CommentModel | undefined> {
    return await this.commentsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
