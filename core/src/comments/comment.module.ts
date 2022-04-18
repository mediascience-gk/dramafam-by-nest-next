import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { DramaModule } from '../entries/drama.module';
import { DramaService } from '../entries/drama.service';
import { DramaRepository } from '../entries/drama.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository, DramaRepository]),
    DramaModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, DramaService],
})
export class CommentModule {}
