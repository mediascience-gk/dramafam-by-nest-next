import { Module } from '@nestjs/common';
import { DramaController } from '../controllers/drama.controller';
import { DramaService } from '../services/drama/drama.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaEntity } from '../interface-adapter/gateways/entities/drama.entity';
import { StaticDramaRepository } from '../interface-adapter/gateways/drama/drama.repository';
import { ReviewService } from '../services/review/review.service';
import { StaticReviewRepository } from '../interface-adapter/gateways/review/review.repository';
import { ReviewEntity } from '../interface-adapter/gateways/entities/review.entity';
import { AvgOfDramaRatingService } from '../services/drama/avg-of-drama-rating.service';
import { ValidateCreateDramaDataService } from '../services/drama/validate-create-drama-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([DramaEntity, ReviewEntity])],
  controllers: [DramaController],
  providers: [
    DramaService,
    ReviewService,
    StaticDramaRepository,
    StaticReviewRepository,
    AvgOfDramaRatingService,
    ValidateCreateDramaDataService,
  ],
})
export class DramaModule {}
