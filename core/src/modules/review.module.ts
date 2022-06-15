import { Module } from '@nestjs/common';
import { ReviewController } from '../controllers/review.controller';
import { ReviewService } from '../services/review/review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticReviewRepository } from '../interface-adapter/orm/gateways/review/static-review.repository';
import { DramaModule } from './drama.module';
import { DramaService } from '../services/drama/drama.service';
import { StaticDramaRepository } from '../interface-adapter/orm/gateways/drama/static-drama.repository';
import { ValidateCreateDramaDataService } from '../services/drama/validate-create-drama-data.service';
import { DramaRepository } from '../models/drama/drama.repository';
import { ReviewRepository } from '../models/review/review.repository';
import {
  DramaOrmRepository,
  ReviewOrmRepository,
} from '../interface-adapter/orm/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewOrmRepository, DramaOrmRepository]),
    DramaModule,
  ],
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
