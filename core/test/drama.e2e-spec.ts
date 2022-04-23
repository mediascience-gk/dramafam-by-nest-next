import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DramaModule } from '../src/drama.module';
import { AppModule } from '../src/app.module';
import { DramaEntity } from '../src/interface-adapter/gateways/entities/drama.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaSeeder } from '../dist/interface-adapter/gateways/seeders/drama.seeder';

describe(DramaModule, () => {
  let module: TestingModule;
  let app: INestApplication;
  let seeder: DramaSeeder;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([DramaEntity])],
      providers: [DramaSeeder],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    seeder = module.get<DramaSeeder>(DramaSeeder);
    await seeder.seed();
  });

  afterEach(async () => {
    // DBクリア
    seeder = module.get<DramaSeeder>(DramaSeeder);
    await seeder.refresh();
  });

  afterAll(async () => {
    await module.close();
  });

  it(`/GET drama`, () => {
    return request(app.getHttpServer()).get('/drama').expect(200);
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
