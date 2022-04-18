import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EntryModule } from '../src/entries/entry.module';
import { AppModule } from '../src/app.module';
import { EntryRepository } from '../src/entries/entry.repository';
import { CommentRepository } from '../src/comments/comment.repository';

describe(EntryModule, () => {
  let app: INestApplication;
  let entryRepository: EntryRepository;
  let commentRepository: CommentRepository;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    entryRepository = app.get<EntryRepository>(EntryRepository);
    commentRepository = app.get<CommentRepository>(CommentRepository);

    // DBクリア
    await entryRepository.query('SET FOREIGN_KEY_CHECKS=0;');
    await commentRepository.clear();
    await entryRepository.clear();
    await entryRepository.query('SET FOREIGN_KEY_CHECKS=1;');
  });

  afterEach(async () => {
    // DBクリア
    await entryRepository.query('SET FOREIGN_KEY_CHECKS=0;');
    await commentRepository.clear();
    await entryRepository.clear();
    await entryRepository.query('SET FOREIGN_KEY_CHECKS=1;');
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
