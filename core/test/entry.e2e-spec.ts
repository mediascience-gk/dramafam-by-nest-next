import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EntryModule } from '../src/modules/entry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModel } from '../src/orm/comment.model';
import { EntryModel } from '../src/orm/entry.model';

let app: INestApplication;

beforeEach(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'test',
        password: 'passwd',
        database: 'sample',
        entities: [CommentModel, EntryModel],
        synchronize: true,
      }),
      EntryModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

it(`/GET entry`, () => {
  return request(app.getHttpServer()).get('/entry').expect(200);
});
