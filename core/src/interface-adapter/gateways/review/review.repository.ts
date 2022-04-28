import { Repository } from 'typeorm';
import { ReviewEntity } from '../entities/review.entity';
import { CreateReviewDto } from '../../../services/dto/create-review.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../../../models/review/review';
import { Drama } from '../../../models/drama/drama';
import { ReviewRepository } from '../../../models/review/review.repository';
import { StaticDramaRepository } from '../drama/drama.repository';
import { AllAge } from '../entities/enum/age.enum';
import { AllGender } from '../entities/enum/gender.enum';

@Injectable()
export class StaticReviewRepository implements ReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly repository: Repository<ReviewEntity>,
    private readonly dramaRepository: StaticDramaRepository,
  ) {}

  static allAge = AllAge;
  static allGender = AllGender;

  async findById(id: number): Promise<Review> {
    const commentEntity = await this.repository.findOne({ id });
    if (!commentEntity) {
      throw new NotFoundException('該当コメントは見つかりませんでした');
    }
    const { body, drama: dramaEntity } = commentEntity;
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
    const commentEntities = await this.repository.find({
      select: ['id', 'body'],
      relations: ['drama'],
      where: {
        drama: { id: dramaId },
      },
      order: { createdAt: 'DESC' },
    });
    const comments = commentEntities.map((comment) => {
      const { id, body, drama } = comment;
      const d = new Drama(
        drama.id,
        drama.title,
        drama.permalink,
        drama.kana,
        new Date(drama.startAt),
        drama.endAt ? new Date(drama.endAt) : undefined,
      );
      return new Review(id, body, d);
    });
    return comments;
  }

  async create(createCommentDto: CreateReviewDto) {
    const { body, dramaId } = createCommentDto;

    const dramaEntity = await this.dramaRepository.findById(dramaId);
    if (!dramaEntity) {
      throw new NotFoundException('該当のドラマが見つかりませんでした');
    }

    const commentEntity: ReviewEntity = await this.repository.create({
      body: body,
      createdAt: new Date(),
      updatedAt: new Date(),
      drama: dramaEntity,
    });
    await this.repository.save(commentEntity);

    const drama = new Drama(
      dramaEntity.id,
      dramaEntity.title,
      dramaEntity.permalink,
      dramaEntity.kana,
      new Date(dramaEntity.startAt),
      dramaEntity.endAt ? new Date(dramaEntity.endAt) : undefined,
    );
    return new Review(commentEntity.id, body, drama);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
