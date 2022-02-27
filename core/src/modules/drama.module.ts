import { Module } from '@nestjs/common';
import { DramaController } from '../controllers/drama.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaModel } from '../orm/drama.model';
import { DramaDBService } from './orm/dramaDB.service';

@Module({
  imports: [TypeOrmModule.forFeature([DramaModel])],
  controllers: [DramaController],
  providers: [DramaDBService],
})
export class DramaModule {}
