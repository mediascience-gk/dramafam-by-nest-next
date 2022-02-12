import { Module } from '@nestjs/common';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';
import { CommentModel } from '../models/comment.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommentModel])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
