import { DramaEntity } from '../entities/drama.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DramaSeeder {
  constructor(
    @InjectRepository(DramaEntity)
    private readonly repository: Repository<DramaEntity>,
  ) {}

  async seed(): Promise<void> {
    // const dramas = [
    //   {
    //     title: 'Test:DramaTitle1',
    //     permalink: 'drama-title1',
    //     kana: 'ドラマタイトル',
    //     kanaStatus: 'とらまたいとる',
    //     startAt: '2022-01-01',
    //     endAt: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     title: 'Test:DramaTitle2',
    //     permalink: 'drama-title2',
    //     kana: 'ドラマタイトル',
    //     kanaStatus: 'とらまたいとる',
    //     startAt: '2022-01-01',
    //     endAt: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     title: 'Test:DramaTitle3',
    //     permalink: 'drama-title3',
    //     kana: 'ドラマタイトル',
    //     kanaStatus: 'とらまたいとる',
    //     startAt: '2022-01-01',
    //     endAt: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     title: 'Test:DramaTitle4',
    //     permalink: 'drama-title4',
    //     kana: 'ドラマタイトル',
    //     kanaStatus: 'とらまたいとる',
    //     startAt: '2022-01-01',
    //     endAt: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     title: 'Test:DramaTitle5',
    //     permalink: 'drama-title5',
    //     kana: 'ドラマタイトル',
    //     kanaStatus: 'とらまたいとる',
    //     startAt: '2022-01-01',
    //     endAt: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ];
    // dramas.map(async (drama) => {
    //   const createdDrama = await this.repository.create(drama);
    //   await this.repository.save(createdDrama);
    // });

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
  }

  async refresh(): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where('title like :title', { title: 'Test:%' })
      .execute();
  }
}
