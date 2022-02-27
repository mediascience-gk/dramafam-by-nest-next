import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DramaModule } from '../src/modules/drama.module';

describe('Drama 追加API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DramaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('<When> に正規のドラマのデータを送信すると、 <Given> そのドラマがすでに登録済みでなければ <Then> ドラマが追加される', () => {
    return request(app.getHttpServer())
      .post('/drama')
      .send({
        name: 'ドラマ名',
        season: '放送時期',
        permalink: 'パーマリンク (URL用文字列)',
        kana: 'よみかた',
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      })
      .expect(201)
      .expect('1');
  });

  it('<When> に不正なドラマのデータを送信すると、 <Then> ドラマは追加されない', () => {
    return request(app.getHttpServer())
      .post('/drama')
      .send({
        name: 'ドラマ名',
        // season: '放送時期',
        permalink: 'パーマリンク (URL用文字列)',
        kana: 'よみかた',
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      })
      .expect(400);
  });

  xit('ログインチェック', () => {});

  xit('エラーハンドリング', () => {});
});
