import { Test } from '@nestjs/testing';
import { EntryModule } from '../../src/entries/entry.module';
// import { Injectable } from '@nestjs/common';
import { EntryRepository } from '../../src/entries/entry.repository';
import { CreateEntryDto } from '../../src/entries/dto/create-entry.dto';
import { AppModule } from '../../src/app.module';
import { CommentRepository } from '../../src/comments/comment.repository';

// @Injectable()
// class StubEntryService {
//   constructor(readonly repository: EntryRepository) {}
// }

// ORM の CRUD のテストをしたい
describe(EntryModule, () => {
  let entryRepository: EntryRepository;
  let commentRepository: CommentRepository;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        /* StubEntryService */
      ],
    }).compile();

    // StubEntryService経由でEntryRepositoryのインスタンスを取得
    // const entryService = moduleFixture.get<StubEntryService>(StubEntryService);
    // repository = entryService.repository;

    // 直接EntryRepositoryのインスタンスを取得
    const app = moduleFixture.createNestApplication();
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

  it('Create a model', async () => {
    // given => zero model

    // when
    // const entry = await entryRepository.create({
    //   title: 'EntryTitle1',
    //   permalink: 'drama-title',
    //   kana: 'ドラマタイトル',
    //   startAt: '2022-04-01',
    //   endAt: null,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // });
    // await entryRepository.save(entry);

    // when (custom entryRepository)
    const createEntryDto: CreateEntryDto = {
      title: 'EntryTitle1',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      startAt: '2022-04-01',
      endAt: null,
    };
    const entry = await entryRepository.createEntry(createEntryDto);

    // then
    expect(entry.title).toEqual('EntryTitle1');
  });

  it('Read a model', async () => {
    // given => has a model (entryRepository.create())
    const entry = await entryRepository.create({
      title: 'EntryTitle1',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: 'とらまたいとる',
      startAt: '2022-04-01',
      endAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await entryRepository.save(entry);

    // when
    const entries = await entryRepository.find();

    // then
    expect(entries.length).toEqual(1);
  });

  it('Update a model', async () => {
    // given => has a model (entryRepository.create())
    const title = 'EntryTitle1';
    const updatedAt = new Date();
    const entry = await entryRepository.create({
      title,
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: 'とらまたいとる',
      startAt: '2022-04-01',
      endAt: null,
      createdAt: new Date(),
      updatedAt,
    });
    await entryRepository.save(entry);

    // when
    entry.title = 'EntryTitle2';
    entry.updatedAt = new Date();
    await entryRepository.save(entry);

    // then
    expect(title).not.toEqual(entry.title);
    expect(updatedAt).not.toEqual(entry.updatedAt);
  });

  it('Delete a model', async () => {
    // given => has a model (entryRepository.create())
    const entry = await entryRepository.create({
      title: 'EntryTitle1',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: 'とらまたいとる',
      startAt: '2022-04-01',
      endAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await entryRepository.save(entry);

    // when
    await entryRepository.delete(entry.id);

    // then
    const deletedEntry = await entryRepository.findOne({
      id: entry.id,
    });
    expect(deletedEntry).toEqual(undefined);
  });
});
