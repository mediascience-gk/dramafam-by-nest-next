import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';

import { EntryModule } from './modules/entry.module';
import { CommentModule } from './modules/comment.module';
import { DramaModule } from './modules/drama.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommentModule, EntryModule, DramaModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
