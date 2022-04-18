import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DramaModule } from '../src/entries/drama.module';
import { AppModule } from '../src/app.module';
import { DramaRepository } from '../src/entries/drama.repository';

describe(DramaModule, () => {
  let module: TestingModule;
  let app: INestApplication;
  let dramaRepository: DramaRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    dramaRepository = app.get<DramaRepository>(DramaRepository);

    // DBクリア
    await dramaRepository.query('SET FOREIGN_KEY_CHECKS=0;');
    await dramaRepository.clear();
    await dramaRepository.query('SET FOREIGN_KEY_CHECKS=1;');
  });

  afterEach(async () => {
    // DBクリア
    await dramaRepository.query('SET FOREIGN_KEY_CHECKS=0;');
    await dramaRepository.clear();
    await dramaRepository.query('SET FOREIGN_KEY_CHECKS=1;');
  });

  afterAll(async () => {
    module.close();
  });

  it(`/GET drama`, () => {
    return request(app.getHttpServer()).get('/drama').expect(200);
  });

  it('/POST drama', () => {
    const postedTitle = 'DramaTitle';

    return request(app.getHttpServer())
      .post('/drama')
      .send({
        title: postedTitle,
        permalink: 'drama-title',
        kana: 'ドラマタイトル',
        startAt: '2022-04-01',
      })
      .expect(201)
      .then((res) => {
        const { id, title } = res.body;
        expect(id).toBeDefined();
        expect(title).toEqual(postedTitle);
      });
  });
});
