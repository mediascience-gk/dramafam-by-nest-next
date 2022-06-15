import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewOrmEntity } from '../interface-adapter/orm/entities/review-orm.entity';
import { DramaOrmEntity } from '../interface-adapter/orm/entities/drama-orm.entity';
import { SeasonOrmEntity } from '../interface-adapter/orm/entities/season-orm.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'test',
      entities: [ReviewOrmEntity, DramaOrmEntity, SeasonOrmEntity],
      synchronize: true,
    }),
  ],
})
export class CommonModule {}
