import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EntryModule } from '../src/entries/entry.module';
import { CommonModule } from '../src/common/common.module';

describe(EntryModule, () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [CommonModule, EntryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/GET entry`, () => {
    return request(app.getHttpServer()).get('/entry').expect(200);
  });
});
