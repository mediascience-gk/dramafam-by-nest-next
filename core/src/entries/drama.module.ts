import { Module } from '@nestjs/common';
import { DramaController } from './drama.controller';
import { DramaService } from './drama.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaRepository } from './drama.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DramaRepository])],
  controllers: [DramaController],
  providers: [DramaService],
})
export class DramaModule {}
