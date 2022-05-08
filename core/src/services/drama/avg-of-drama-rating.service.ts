import { StaticReviewRepository } from '../../interface-adapter/gateways/review/review.repository';
import { Injectable } from '@nestjs/common';
import { RatingAvg } from './types/rating-avg';
import { RatingData } from '../../models/drama/rating-data';
import { RatingDataItem } from '../../models/drama/rating-data-item';

@Injectable()
export class AvgOfDramaRatingService {
  constructor(private readonly reviewRepository: StaticReviewRepository) {}

  async get(id: number): Promise<RatingData> {
    const ratingAvg: RatingAvg = await this.reviewRepository.getRatingAvg(id);
    const ratingData = new RatingData();
    if (ratingAvg.general) {
      ratingData.general = new RatingDataItem('総合評価', ratingAvg.general);
    }
    if (ratingAvg.cast) {
      ratingData.cast = new RatingDataItem('キャスト', ratingAvg.cast);
    }
    if (ratingAvg.story) {
      ratingData.story = new RatingDataItem(
        '脚本・ストーリー',
        ratingAvg.story,
        '脚本',
      );
      if (ratingAvg.production) {
        ratingData.production = new RatingDataItem(
          '演出',
          ratingAvg.production,
        );
      }
      if (ratingAvg.impression) {
        ratingData.impression = new RatingDataItem(
          '感動',
          ratingAvg.impression,
        );
      }
      if (ratingAvg.music) {
        ratingData.music = new RatingDataItem('音楽', ratingAvg.music);
      }
      if (ratingAvg.comedy) {
        ratingData.comedy = new RatingDataItem('笑い', ratingAvg.comedy);
      }
    }
    return ratingData;
  }
}
