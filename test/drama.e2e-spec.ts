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

  it('<When> に正規のドラマのデータを送信すれば、 <Given> そのドラマがすでに登録済みでなければ <Then> ドラマが追加される', () => {
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

  xit('入力項目のバリデーション機能の実装 ', () => {});

  xit('ログインチェック', () => {});

  xit('エラーハンドリング', () => {});
});
