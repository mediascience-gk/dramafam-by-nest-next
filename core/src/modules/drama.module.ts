import { Module } from '@nestjs/common';
import { DramaController } from '../controllers/drama.controller';
import { DramaService } from '../services/drama/drama.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticDramaRepository } from '../interface-adapter/orm/gateways/drama/static-drama.repository';
import { ReviewService } from '../services/review/review.service';
import { StaticReviewRepository } from '../interface-adapter/orm/gateways/review/static-review.repository';
import { ValidateCreateDramaDataService } from '../services/drama/validate-create-drama-data.service';
import { DramaRepository } from '../models/drama/drama.repository';
import { ReviewRepository } from '../models/review/review.repository';
import {
  DramaOrmRepository,
  ReviewOrmRepository,
} from '../interface-adapter/orm/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([DramaOrmRepository, ReviewOrmRepository]),
  ],
  controllers: [DramaController],
  providers: [
    DramaService,
    ReviewService,
    { provide: DramaRepository, useClass: StaticDramaRepository },
    { provide: ReviewRepository, useClass: StaticReviewRepository },
    ValidateCreateDramaDataService,
  ],
})
export class DramaModule {}
