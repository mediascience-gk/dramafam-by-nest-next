import { createQueryBuilder, Repository } from 'typeorm';
import { ReviewEntity } from '../entities/review.entity';
import { CreateReviewDto } from '../../../services/review/dto/create-review.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../../../models/review/review';
import { Drama } from '../../../models/drama/drama';
import { ReviewRepository } from '../../../models/review/review.repository';
import { StaticDramaRepository } from '../drama/drama.repository';
import { DramaEntity } from '../entities/drama.entity';
import { RatingAvg } from '../../../services/drama/types/rating-avg';

@Injectable()
export class StaticReviewRepository implements ReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(DramaEntity)
    private readonly dramaRepository: Repository<DramaEntity>,
    private readonly staticDramaRepository: StaticDramaRepository,
  ) {}

  async findById(id: number): Promise<Review> {
    const reviewEntity = await this.reviewRepository.findOne({ id });
    if (!reviewEntity) {
      throw new NotFoundException('該当コメントは見つかりませんでした');
    }
    const { body, drama: dramaEntity } = reviewEntity;
    const drama = new Drama(
      dramaEntity.id,
      dramaEntity.title,
      dramaEntity.permalink,
      dramaEntity.kana,
      new Date(dramaEntity.startAt),
      dramaEntity.endAt ? new Date(dramaEntity.endAt) : undefined,
    );
    return new Review(id, body, drama);
  }

  async findAllByDramaId(dramaId: number) {
    const reviewEntities = await this.reviewRepository.find({
      relations: ['drama'],
      where: {
        drama: { id: dramaId },
      },
      order: { createdAt: 'DESC' },
    });
    const reviews = reviewEntities.map((reviewEntity) => {
      return this.convertEntityToModel(reviewEntity);
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

    const reviewEntity: ReviewEntity = await this.reviewRepository.create({
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
    });
    await this.reviewRepository.save(reviewEntity);

    return this.convertEntityToModel(reviewEntity);
  }

  async delete(id: number): Promise<void> {
    await this.reviewRepository.delete({ id });
  }

  async getRatingAvg(dramaId: number): Promise<RatingAvg> {
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
      ])
      .where('dramaId = :dramaId', { dramaId })
      .getRawOne();
    return ratingAvg;
  }

  public convertEntityToModel(reviewEntity: ReviewEntity): Review {
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
    } = reviewEntity;

    const drama = this.staticDramaRepository.convertEntityToModel(dramaEntity);
    const review = new Review(id, body, drama);
    if (commentator) {
      review.commentator = commentator;
    }
    if (age) {
      review.age = age;
    }
    if (gender) {
      review.gender = gender;
    }
    if (ratingOfGeneral) {
      review.ratingOfGeneral = ratingOfGeneral;
    }
    if (ratingOfCast) {
      review.ratingOfCast = ratingOfCast;
    }
    if (ratingOfStory) {
      review.ratingOfStory = ratingOfStory;
    }
    if (ratingOfProduction) {
      review.ratingOfProduction = ratingOfProduction;
    }
    if (ratingOfImpression) {
      review.ratingOfImpression = ratingOfImpression;
    }
    if (ratingOfMusic) {
      review.ratingOfMusic = ratingOfMusic;
    }
    if (ratingOfComedy) {
      review.ratingOfComedy = ratingOfComedy;
    }
    if (ratingOfThrill) {
      review.ratingOfThrill = ratingOfThrill;
    }

    return review;
  }
}
