import { Comment } from './comment';
import { CreateCommentDto } from '../../services/dto/create-comment.dto';

export interface CommentRepository {
  findById(id: number): Promise<Comment>;

  create(createCommentDto: CreateCommentDto): Promise<Comment>;

  findAllByDramaId(dramaId: number): Promise<Comment[]>;

  delete(id: number): Promise<void>;
}
