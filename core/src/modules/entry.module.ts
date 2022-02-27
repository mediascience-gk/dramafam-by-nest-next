import { Module } from '@nestjs/common';
import { EntryController } from '../controllers/entry.controller';
import { EntryService } from '../services/entry.service';
import { CommentService } from '../services/comment.service';
import { EntryModel } from '../models/entry.model';
import { CommentModel } from '../models/comment.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EntryModel, CommentModel])],
  controllers: [EntryController],
  providers: [EntryService, CommentService],
})
export class EntryModule {}
