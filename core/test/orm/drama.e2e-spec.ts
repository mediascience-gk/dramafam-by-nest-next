import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DramaModule } from '../../src/modules/drama.module';
import { DramaModel } from '../../src/orm/drama.model';

describe('Drama 追加API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DramaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dramaModel = app.get<DramaModel>(DramaModel);
  });
});
