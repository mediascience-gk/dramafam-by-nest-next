import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from '../interface-adapter/gateways/entities/review.entity';
import { DramaEntity } from '../interface-adapter/gateways/entities/drama.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'test',
      entities: [ReviewEntity, DramaEntity],
      synchronize: true,
    }),
  ],
})
export class CommonModule {}
