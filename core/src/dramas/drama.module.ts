import { Module } from '@nestjs/common';
import { DramaController } from './drama.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaDBService } from './orm/dramaDB.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [DramaController],
  providers: [],
})
export class DramaModule {}
