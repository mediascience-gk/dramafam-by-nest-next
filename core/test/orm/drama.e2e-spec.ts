import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DramaModule } from '../../src/modules/drama.module';
import { DramaDBService } from '../../src/modules/orm/dramaDB.service';
import { DramaModel } from '../../src/orm/drama.model';

describe('Drama ORM Model', () => {
  let app: INestApplication;
  let dramaDbService: DramaDBService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DramaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dramaDbService = app.get<DramaDBService>(DramaDBService);

    const dramaModel = new DramaModel();
    dramaModel.name = 'ドラマ名';
    dramaModel.season = '放送時期';
    dramaModel.permalink = 'パーマリンク (URL用文字列)';
    dramaModel.kana = 'よみかた';
    dramaModel.tvCompany = '放送局';
    dramaModel.startAt = new Date('2022-02-27T17:45:29.215Z');
    dramaModel.endAt = new Date('2022-02-27T17:45:29.215Z');

    await dramaDbService.dramasRepository.save(dramaModel);
  });

  xit('retrieve drama data form DB', async () => {
    const dramaModel = await dramaDbService.dramasRepository.findOne({
      where: {
        name: 'ドラマ名',
      },
    });

    expect(dramaModel).toBeInstanceOf(DramaModel);
    expect(dramaModel?.name).toBe('ドラマ名');
  });
});
