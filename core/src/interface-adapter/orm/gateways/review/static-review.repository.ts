import { ReviewOrmEntity } from '../../entities/review-orm.entity';
import { CreateReviewDto } from '../../../../models/review/dtos/create-review.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from '../../../../models/review/review';
import { ReviewRepository } from '../../../../models/review/review.repository';
import { StaticDramaRepository } from '../drama/static-drama.repository';
import { Rating } from '../../../../models/drama/rating';
import { DramaOrmRepository, ReviewOrmRepository } from '../../repositories';

@Injectable()
export class StaticReviewRepository implements ReviewRepository {
  constructor(
    private readonly reviewRepository: ReviewOrmRepository,
    private readonly dramaRepository: DramaOrmRepository, // private readonly staticDramaRepository: StaticDramaRepository,
  ) {}

  async findById(id: number): Promise<Review> {
    const reviewOrmEntity = await this.reviewRepository.findOne({ id });
    if (!reviewOrmEntity) {
      throw new NotFoundException('該当コメントは見つかりませんでした');
    }
    return this.convertOrmEntityToModel(reviewOrmEntity);
  }

  async findAllByDramaId(dramaId: number) {
    const reviewEntities = await this.reviewRepository.find({
      relations: ['drama'],
      where: {
        drama: { id: dramaId },
      },
      order: { createdAt: 'DESC' },
    });
    const reviews = reviewEntities.map((reviewOrmEntity) => {
      return this.convertOrmEntityToModel(reviewOrmEntity);
    });
    return reviews;
  }

  async create(createCommentDto: CreateReviewDto) {
    const {
      commentator,
      age,
      gender,
      ratingOfGeneral,
      ratingOfCast,
      ratingOfStory,
      ratingOfProduction,
      ratingOfMusic,
      ratingOfComedy,
      ratingOfImpression,
      ratingOfThrill,
      body,
      dramaId,
    } = createCommentDto;

    const dramaEntity = await this.dramaRepository
      .createQueryBuilder()
      .where('id = :id', { id: dramaId })
      .getOne();
    if (!dramaEntity) {
      throw new NotFoundException('該当のドラマが見つかりませんでした');
    }

    const reviewOrmEntity: ReviewOrmEntity = await this.reviewRepository.create(
      {
        commentator,
        age,
        gender,
        ratingOfGeneral,
        ratingOfCast,
        ratingOfStory,
        ratingOfProduction,
        ratingOfMusic,
        ratingOfComedy,
        ratingOfImpression,
        ratingOfThrill,
        body,
        createdAt: new Date(),
        updatedAt: new Date(),
        drama: dramaEntity,
      },
    );
    await this.reviewRepository.save(reviewOrmEntity);

    return this.convertOrmEntityToModel(reviewOrmEntity);
  }

  async delete(id: number): Promise<void> {
    await this.reviewRepository.delete({ id });
  }

  async getRating(dramaId: number): Promise<Rating> {
    const ratingAvg = await this.reviewRepository
      .createQueryBuilder()
      .select([
        'AVG(ratingOfGeneral) as general',
        'AVG(ratingOfCast) as cast',
        'AVG(ratingOfStory) as story',
        'AVG(ratingOfProduction) as production',
        'AVG(ratingOfImpression) as impression',
        'AVG(ratingOfMusic) as music',
        'AVG(ratingOfComedy) as comedy',
        'AVG(ratingOfThrill) as thrill',
      ])
      .where('dramaId = :dramaId', { dramaId })
      .getRawOne();
    const rating = new Rating();
    rating.general = { score: ratingAvg.general || null };
    rating.cast = { score: ratingAvg.cast || null };
    rating.story = { score: ratingAvg.story || null };
    rating.production = { score: ratingAvg.production || null };
    rating.impression = { score: ratingAvg.impression || null };
    rating.music = { score: ratingAvg.music || null };
    rating.comedy = { score: ratingAvg.comedy || null };
    rating.thrill = { score: ratingAvg.thrill || null };
    return rating;
  }

  public convertOrmEntityToModel(reviewOrmEntity: ReviewOrmEntity): Review {
    const {
      id,
      body,
      commentator,
      age,
      gender,
      ratingOfGeneral,
      ratingOfCast,
      ratingOfStory,
      ratingOfProduction,
      ratingOfImpression,
      ratingOfMusic,
      ratingOfComedy,
      ratingOfThrill,
      drama: dramaEntity,
    } = reviewOrmEntity;

    const dramaPresentation =
      StaticDramaRepository.convertOrmEntityToPresentation(dramaEntity);
    const review = new Review(id, body, dramaPresentation);
    if (commentator) {
      review.commentator = commentator;
    }
    if (age) {
      review.age = age;
    }
    if (gender) {
      review.gender = gender;
    }
    review.rating = {
      general: { score: ratingOfGeneral || null },
      cast: { score: ratingOfCast || null },
      story: { score: ratingOfStory || null },
      production: { score: ratingOfProduction || null },
      impression: { score: ratingOfImpression || null },
      music: { score: ratingOfMusic || null },
      comedy: { score: ratingOfComedy || null },
      thrill: { score: ratingOfThrill || null },
    };
    return review;
  }
}
