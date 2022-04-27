import { Module } from '@nestjs/common';
import { DramaController } from '../controllers/drama.controller';
import { DramaService } from '../services/drama.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaEntity } from '../interface-adapter/gateways/entities/drama.entity';
import { StaticDramaRepository } from '../interface-adapter/gateways/drama/drama.repository';
import { ReviewService } from '../services/review.service';
import { StaticReviewRepository } from '../interface-adapter/gateways/review/review.repository';
import { ReviewEntity } from '../interface-adapter/gateways/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DramaEntity, ReviewEntity])],
  controllers: [DramaController],
  providers: [
    DramaService,
    ReviewService,
    StaticDramaRepository,
    StaticReviewRepository,
  ],
})
export class DramaModule {}
