import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Injectable } from '@nestjs/common';
import { DramaModule } from '../src/drama.module';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { DramaEntity } from '../src/interface-adapter/gateways/entities/drama.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../src/common.module';

describe(DramaModule, () => {
  let module: TestingModule;
  let app: INestApplication;
  let dramaRepository: Repository<DramaEntity>;

  @Injectable()
  class StubDramaRepository {
    constructor(
      @InjectRepository(DramaEntity)
      readonly dramaRepository: Repository<DramaEntity>,
    ) {}
  }

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([DramaEntity])],
      providers: [StubDramaRepository],
    }).compile();

    const stubRepository = module.get<StubDramaRepository>(StubDramaRepository);
    dramaRepository = stubRepository.dramaRepository;

    app = module.createNestApplication();
    await app.init();

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
    await module.close();
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
