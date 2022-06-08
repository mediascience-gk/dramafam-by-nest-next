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
    ratingData.general = new RatingDataItem(
      '総合評価',
      ratingAvg.general || null,
    );
    ratingData.cast = new RatingDataItem('キャスト', ratingAvg.cast || null);
    ratingData.story = new RatingDataItem(
      '脚本・ストーリー',
      ratingAvg.story || null,
      '脚本',
    );
    ratingData.production = new RatingDataItem(
      '演出',
      ratingAvg.production || null,
    );
    ratingData.impression = new RatingDataItem(
      '感動',
      ratingAvg.impression || null,
    );
    ratingData.music = new RatingDataItem('音楽', ratingAvg.music || null);
    ratingData.comedy = new RatingDataItem('笑い', ratingAvg.comedy || null);
    return ratingData;
  }
}
