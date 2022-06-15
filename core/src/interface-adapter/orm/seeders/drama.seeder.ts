import { DramaOrmEntity } from '../entities/drama-orm.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewOrmEntity } from '../entities/review-orm.entity';

@Injectable()
export class DramaSeeder {
  constructor(
    @InjectRepository(DramaOrmEntity)
    private readonly repository: Repository<DramaOrmEntity>,
    @InjectRepository(ReviewOrmEntity)
    private readonly reviewRepository: Repository<ReviewOrmEntity>,
  ) {}

  async seed(): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .insert()
      .values([
        {
          title: 'Test:DramaTitle1',
          permalink: 'drama-title1',
          kana: 'ドラマタイトル',
          kanaStatus: 'とらまたいとる',
          startAt: '2022-01-01',
          endAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Test:DramaTitle2',
          permalink: 'drama-title2',
          kana: 'ドラマタイトル',
          kanaStatus: 'とらまたいとる',
          startAt: '2022-01-01',
          endAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Test:DramaTitle3',
          permalink: 'drama-title3',
          kana: 'ドラマタイトル',
          kanaStatus: 'とらまたいとる',
          startAt: '2022-01-01',
          endAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Test:DramaTitle4',
          permalink: 'drama-title4',
          kana: 'ドラマタイトル',
          kanaStatus: 'とらまたいとる',
          startAt: '2022-01-01',
          endAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Test:DramaTitle5',
          permalink: 'drama-title5',
          kana: 'ドラマタイトル',
          kanaStatus: 'とらまたいとる',
          startAt: '2022-01-01',
          endAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .execute();

    const dramaEntity = await this.repository
      .createQueryBuilder()
      .where('title like :title', { title: 'Test:%' })
      .getOne();

    if (!dramaEntity) {
      throw Error;
    }

    await this.reviewRepository
      .createQueryBuilder()
      .insert()
      .into('ReviewEntity')
      .values([
        {
          commentator: 'commentator1',
          age: '20代',
          gender: '男性',
          ratingOfGeneral: 4,
          body: 'body1',
          drama: dramaEntity,
        },
        {
          commentator: 'commentator2',
          age: '20代',
          gender: '男性',
          ratingOfGeneral: 5,
          body: 'body2',
          drama: dramaEntity,
        },
      ])
      .execute();
  }

  async refresh(): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where('title like :title', { title: 'Test:%' })
      .execute();
  }
}
