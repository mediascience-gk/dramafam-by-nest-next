import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DramaModule } from '../src/modules/drama.module';
import { AppModule } from '../src/app.module';
import { DramaOrmEntity } from '../src/interface-adapter/orm/entities/drama.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaSeeder } from '../dist/interface-adapter/gateways/seeders/drama.seeder';
import { ReviewOrmEntity } from '../src/interface-adapter/orm/entities/review.entity';

describe(DramaModule, () => {
  let module: TestingModule;
  let app: INestApplication;
  let seeder: DramaSeeder;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([DramaOrmEntity, ReviewOrmEntity]),
      ],
      providers: [DramaSeeder],
    }).compile();

    seeder = module.get<DramaSeeder>(DramaSeeder);

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await seeder.refresh();
    await seeder.seed();
  });

  afterAll(async () => {
    await seeder.refresh();
    await module.close();
  });

  it(`/GET drama`, () => {
    return request(app.getHttpServer())
      .get('/drama')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('/POST drama', () => {
    const postedTitle = 'Test: DramaTitle';

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
