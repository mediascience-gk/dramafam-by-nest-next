import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentModel } from '../orm/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentModel)
    private commentsRepository: Repository<CommentModel>,
  ) {}

  findAll(): Promise<CommentModel[]> {
    return this.commentsRepository.find({
      select: ['id', 'body'],
      relations: ['entry'],
      where: {
        entry: { id: 1 },
      },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number): Promise<CommentModel | undefined> {
    return this.commentsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
