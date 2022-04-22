import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from '../../../services/dto/create-comment.dto';
import { DramaEntity } from '../entities/drama.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../../models/comment/comment';
import { Drama } from '../../../models/drama/drama';
import { CommentRepository } from '../../../models/comment/comment.repository';
import { StaticDramaRepository } from '../drama/drama.repository';

@Injectable()
export class StaticCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
    private readonly dramaRepository: StaticDramaRepository,
  ) {}

  async findById(id: number): Promise<Comment> {
    const commentEntity = await this.repository.findOne({ id });
    if (!commentEntity) {
      throw new NotFoundException('該当コメントは見つかりませんでした');
    }
    const { body, drama: dramaEntity } = commentEntity;
    const drama = new Drama(
      dramaEntity.id,
      dramaEntity.title,
      dramaEntity.permalink,
      dramaEntity.kana,
      new Date(dramaEntity.startAt),
      dramaEntity.endAt ? new Date(dramaEntity.endAt) : undefined,
    );
    return new Comment(id, body, drama);
  }

  async findAllByDramaId(dramaId: number) {
    const commentEntities = await this.repository.find({
      select: ['id', 'body'],
      relations: ['drama'],
      where: {
        drama: { id: dramaId },
      },
      order: { createdAt: 'DESC' },
    });
    const comments = commentEntities.map((comment) => {
      const { id, body, drama } = comment;
      const d = new Drama(
        drama.id,
        drama.title,
        drama.permalink,
        drama.kana,
        new Date(drama.startAt),
        drama.endAt ? new Date(drama.endAt) : undefined,
      );
      return new Comment(id, body, d);
    });
    return comments;
  }

  async create(createCommentDto: CreateCommentDto) {
    const { body, dramaId } = createCommentDto;

    const dramaEntity = await this.dramaRepository.findById(dramaId);
    if (!dramaEntity) {
      throw new NotFoundException('該当のドラマが見つかりませんでした');
    }

    const commentEntity: CommentEntity = await this.repository.create({
      body: body,
      createdAt: new Date(),
      updatedAt: new Date(),
      drama: dramaEntity,
    });
    await this.repository.save(commentEntity);

    const drama = new Drama(
      dramaEntity.id,
      dramaEntity.title,
      dramaEntity.permalink,
      dramaEntity.kana,
      new Date(dramaEntity.startAt),
      dramaEntity.endAt ? new Date(dramaEntity.endAt) : undefined,
    );
    return new Comment(commentEntity.id, body, drama);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
