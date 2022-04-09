import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { EntryModule } from '../entries/entry.module';
import { EntryService } from '../entries/entry.service';
import { EntryRepository } from '../entries/entry.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository, EntryRepository]),
    EntryModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, EntryService],
})
export class CommentModule {}
