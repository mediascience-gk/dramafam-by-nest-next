import { Module } from '@nestjs/common';
import { DramaController } from '../controllers/drama.controller';
import { DramaService } from '../services/drama/drama.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaEntity } from '../interface-adapter/gateways/entities/drama.entity';
import { StaticDramaRepository } from '../interface-adapter/gateways/drama/static-drama.repository';
import { ReviewService } from '../services/review/review.service';
import { StaticReviewRepository } from '../interface-adapter/gateways/review/static-review.repository';
import { ReviewEntity } from '../interface-adapter/gateways/entities/review.entity';
import { ValidateCreateDramaDataService } from '../services/drama/validate-create-drama-data.service';
import { DramaRepository } from '../models/drama/drama.repository';
import { ReviewRepository } from '../models/review/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DramaEntity, ReviewEntity])],
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
