import { Module } from '@nestjs/common';
import { EntryController } from '../controllers/entry.controller';
import { EntryService } from '../services/entry.service';
import { EntryModel } from '../models/entry.model';
import { CommentModule } from '../modules/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EntryModel]), CommentModule],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
