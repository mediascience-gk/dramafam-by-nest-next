import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';

import { EntryModule } from './entries/entry.module';
import { CommentModule } from './comments/comment.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommentModule, EntryModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
