import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { EntryModule } from './modules/entry.module';
import { CommentModule } from './modules/comment.module';
import { DramaModule } from './modules/drama.module';
import { CommentModel } from './orm/comment.model';
import { DramaModel } from './orm/drama.model';
import { EntryModel } from './orm/entry.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'passwd',
      database: 'sample',
      entities: [CommentModel, DramaModel, EntryModel],
      synchronize: true,
    }),
    CommentModule,
    EntryModule,
    DramaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
