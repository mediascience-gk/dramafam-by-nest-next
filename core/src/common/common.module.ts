import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModel } from '../entities/comment.model';
import { EntryModel } from '../entities/entry.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'passwd',
      database: 'sample',
      entities: [CommentModel, EntryModel],
      synchronize: true,
    }),
  ],
})
export class CommonModule {}
