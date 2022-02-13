import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { EntryModule } from './modules/entry.module';
import { CommentModule } from './modules/comment.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CommentModule, EntryModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}