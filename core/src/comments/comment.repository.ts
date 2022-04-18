import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DramaEntity } from '../entities/drama.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(createCommentDto: CreateCommentDto, drama: DramaEntity) {
    const { body } = createCommentDto;
    const comment = this.create({
      body,
      createdAt: new Date(),
      updatedAt: new Date(),
      drama,
    });
    await this.save(comment);

    return comment;
  }
}
