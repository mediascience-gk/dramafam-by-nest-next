import { EntityRepository, Repository } from 'typeorm';
import { CommentModel } from '../entities/comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EntryModel } from '../entities/entry.model';

@EntityRepository(CommentModel)
export class CommentRepository extends Repository<CommentModel> {
  async createComment(createCommentDto: CreateCommentDto, entry: EntryModel) {
    const { body } = createCommentDto;
    const comment = this.create({
      body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      entry,
    });
    await this.save(comment);

    return comment;
  }
}
