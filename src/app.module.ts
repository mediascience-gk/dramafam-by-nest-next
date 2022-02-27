import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { EntryModule } from './modules/entry.module';
import { CommentModule } from './modules/comment.module';
import { DramaModule } from './modules/drama.module';
import { DramaController } from './controllers/drama.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), CommentModule, EntryModule, DramaModule],
  controllers: [DramaController],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
