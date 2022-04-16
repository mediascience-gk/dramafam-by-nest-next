import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EntryModule } from '../src/entries/entry.module';
import { CommonModule } from '../src/common/common.module';

describe(EntryModule, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [CommonModule, EntryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/GET entry`, () => {
    return request(app.getHttpServer()).get('/entry').expect(200);
  });

  it('/POST create', () => {
    const postedTitle = 'DramaTitle';

    return request(app.getHttpServer())
      .post('/entry')
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
