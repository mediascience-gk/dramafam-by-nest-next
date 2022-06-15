import { Test, TestingModule } from '@nestjs/testing';
import { DramaModule } from '../../src/modules/drama.module';
import { DramaOrmEntity } from '../../src/interface-adapter/orm/entities/drama.entity';
import { Repository } from 'typeorm';
import { convertKanaToKanaStatus } from '../../src/utils/kana-status/convert-kana-to-kana-status';
import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/app.module';
import { DramaSeeder } from '../../dist/interface-adapter/gateways/seeders/drama.seeder';
import { ReviewOrmEntity } from '../../src/interface-adapter/orm/entities/review.entity';

// ORM の CRUD のテストをしたい
describe(DramaModule, () => {
  let dramaRepository: Repository<DramaOrmEntity>;
  let drama: DramaOrmEntity;
  let module: TestingModule;
  let seeder: DramaSeeder;

  @Injectable()
  class StubDramaRepository {
    constructor(
      @InjectRepository(DramaOrmEntity)
      readonly dramaRepository: Repository<DramaOrmEntity>,
    ) {}
  }

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([DramaOrmEntity, ReviewOrmEntity]),
      ],
      providers: [StubDramaRepository, DramaSeeder],
    }).compile();

    // repositoryのインスタンスを取得
    const stubRepository = module.get<StubDramaRepository>(StubDramaRepository);
    dramaRepository = stubRepository.dramaRepository;

    // DBクリア
    // seeder = module.get<DramaSeeder>(DramaSeeder);
    // await seeder.refresh();

    const app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    // given => has a model (dramaRepository.create())
    const mockDramaEntity = {
      title: 'Test: DramaTitle1',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: convertKanaToKanaStatus('ドラマタイトル'),
      startAt: '2022-04-01',
      endAt: null,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdDrama = await dramaRepository.create(mockDramaEntity);
    drama = await dramaRepository.save(createdDrama);
  });

  afterEach(async () => {
    // DBクリア
    seeder = module.get<DramaSeeder>(DramaSeeder);
    await seeder.refresh();
  });

  afterAll(async () => {
    await module.close();
  });

  it('Create a model', async () => {
    // given => zero model

    // when (custom dramaRepository)
    const mockDramaEntity = {
      title: 'Test:CreateDramaTitle',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: convertKanaToKanaStatus('ドラマタイトル'),
      startAt: '2022-04-01',
      endAt: null,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdDrama = await dramaRepository.create(mockDramaEntity);
    await dramaRepository.save(createdDrama);

    // then
    expect(createdDrama.title).toEqual('Test:CreateDramaTitle');
  });

  it('Create a model (titleが80文字ちょうど)', async () => {
    // given => zero model

    // when (custom dramaRepository)
    const mockDramaEntity = {
      title:
        'Test:あああああああああああああああ' +
        'ああああああああああああああああああああ' +
        'ああああああああああああああああああああ' +
        'ああああああああああああああああああああ',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: convertKanaToKanaStatus('ドラマタイトル'),
      startAt: '2022-04-01',
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdDrama = await dramaRepository.create(mockDramaEntity);
    await dramaRepository.save(createdDrama);

    // then
    expect(createdDrama.permalink).toEqual('drama-title');
  });

  it('Create a model (titleが80文字以上)', async () => {
    // given => zero model

    // when (custom dramaRepository)
    const mockDramaEntity = {
      title:
        'Test:あああああああああああああああ' +
        'ああああああああああああああああああああ' +
        'ああああああああああああああああああああ' +
        'ああああああああああああああああああああ' +
        'あ',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: convertKanaToKanaStatus('ドラマタイトル'),
      startAt: '2022-04-01',
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const dramaEntity = await dramaRepository.create(mockDramaEntity);
    await expect(dramaRepository.save(dramaEntity)).rejects.toThrow();
  });

  it('Read a model', async () => {
    // given => has a model

    // when
    const dramas = await dramaRepository.find();

    // then
    expect(dramas).toBeDefined();
  });

  it('Update a model', async () => {
    // given => has a model (dramaRepository.create())
    const title = drama.title;

    // when
    drama.title = 'Test:DramaTitle2';
    await dramaRepository.save(drama);

    // then
    expect(title).not.toEqual(drama.title);
  });

  it('Delete a model', async () => {
    // given => has a model

    // when
    await dramaRepository.delete(drama.id);

    // then
    const deletedDrama = await dramaRepository.findOne({
      id: drama.id,
    });
    expect(deletedDrama).toEqual(undefined);
  });
});
