import { Test, TestingModule } from '@nestjs/testing';
import { DramaModule } from '../../src/entries/drama.module';
import { DramaRepository } from '../../src/entries/drama.repository';
import { CreateDramaDto } from '../../src/entries/dto/create-drama.dto';
import { AppModule } from '../../src/app.module';
import { DramaEntity } from '../../src/entities/drama.entity';

// ORM の CRUD のテストをしたい
describe(DramaModule, () => {
  let dramaRepository: DramaRepository;
  let drama: DramaEntity;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    // repositoryのインスタンスを取得
    const app = module.createNestApplication();
    await app.init();

    dramaRepository = app.get<DramaRepository>(DramaRepository);

    // DBクリア
    await dramaRepository.query('SET FOREIGN_KEY_CHECKS=0;');
    await dramaRepository.clear();
    await dramaRepository.query('SET FOREIGN_KEY_CHECKS=1;');
  });

  beforeEach(async () => {
    // given => has a model (dramaRepository.create())
    const createDramaDto: CreateDramaDto = {
      title: 'DramaTitle1',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      startAt: '2022-04-01',
      endAt: null,
    };
    drama = await dramaRepository.createDrama(createDramaDto);
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

  it('Create a model', async () => {
    // given => zero model

    // when (custom dramaRepository)
    const createDramaDto: CreateDramaDto = {
      title: 'DramaTitle1',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      startAt: '2022-04-01',
      endAt: null,
    };
    const createdDrama = await dramaRepository.createDrama(createDramaDto);

    // then
    expect(createdDrama.title).toEqual('DramaTitle1');
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
    drama.title = 'DramaTitle2';
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
