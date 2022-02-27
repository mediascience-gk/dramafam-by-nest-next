import { Module } from '@nestjs/common';
import { DramaController } from '../controllers/drama.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaModel } from '../orm/drama.model';

@Module({
  imports: [TypeOrmModule.forFeature([DramaModel])],
  controllers: [DramaController],
  providers: [],
})
export class DramaModule {}
