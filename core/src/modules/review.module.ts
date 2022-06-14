import { Module } from '@nestjs/common';
import { ReviewController } from '../controllers/review.controller';
import { ReviewService } from '../services/review/review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticReviewRepository } from '../interface-adapter/gateways/review/static-review.repository';
import { DramaModule } from './drama.module';
import { DramaService } from '../services/drama/drama.service';
import { DramaEntity } from '../interface-adapter/gateways/entities/drama.entity';
import { StaticDramaRepository } from '../interface-adapter/gateways/drama/static-drama.repository';
import { ReviewEntity } from '../interface-adapter/gateways/entities/review.entity';
import { ValidateCreateDramaDataService } from '../services/drama/validate-create-drama-data.service';
import { DramaRepository } from '../models/drama/drama.repository';
import { ReviewRepository } from '../models/review/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, DramaEntity]), DramaModule],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    DramaService,
    { provide: DramaRepository, useClass: StaticDramaRepository },
    { provide: ReviewRepository, useClass: StaticReviewRepository },
    ValidateCreateDramaDataService,
  ],
})
export class ReviewModule {}
