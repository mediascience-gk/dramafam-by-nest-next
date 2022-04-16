import { Test } from '@nestjs/testing';
import { EntryModule } from '../../src/entries/entry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Injectable } from '@nestjs/common';
import { EntryRepository } from '../../src/entries/entry.repository';
import { CommonSpecModule } from '../../src/common/common-spec.module';
import { CreateEntryDto } from '../../src/entries/dto/create-entry.dto';

// @Injectable()
// class StubEntryService {
//   constructor(readonly repository: EntryRepository) {}
// }

// ORM の CRUD のテストをしたい
describe(EntryModule, () => {
  let repository: EntryRepository;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [CommonSpecModule, TypeOrmModule.forFeature([EntryRepository])],
      providers: [
        /* StubEntryService */
      ],
    }).compile();

    // StubEntryService経由でEntryRepositoryのインスタンスを取得
    // const entryService = moduleFixture.get<StubEntryService>(StubEntryService);
    // repository = entryService.repository;

    // 直接EntryRepositoryのインスタンスを取得
    const app = moduleFixture.createNestApplication();
    repository = app.get<EntryRepository>(EntryRepository);
  });

  it('Create a model', async () => {
    // given => zero model

    // when
    // const entry = await repository.create({
    //   title: 'EntryTitle1',
    //   permalink: 'drama-title',
    //   kana: 'ドラマタイトル',
    //   startAt: '2022-04-01',
    //   endAt: null,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // });
    // await repository.save(entry);

    // when (custom repository)
    const createEntryDto: CreateEntryDto = {
      title: 'EntryTitle1',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      startAt: '2022-04-01',
      endAt: null,
    };
    const entry = await repository.createEntry(createEntryDto);

    // then
    expect(entry.title).toEqual('EntryTitle1');
    await repository.delete(entry.id);
  });

  it('Read a model', async () => {
    // given => has a model (repository.create())
    const entry = await repository.create({
      title: 'EntryTitle1',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: 'とらまたいとる',
      startAt: '2022-04-01',
      endAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await repository.save(entry);

    // when
    const entries = await repository.find();

    // then
    // console.log(entries);
    expect(entries.length).toEqual(1);
    await repository.delete(entry.id);
  });

  it('Update a model', async () => {
    // given => has a model (repository.create())
    const title = 'EntryTitle1';
    const updatedAt = new Date();
    const entry = await repository.create({
      title,
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: 'とらまたいとる',
      startAt: '2022-04-01',
      endAt: null,
      createdAt: new Date(),
      updatedAt,
    });
    await repository.save(entry);

    // when
    entry.title = 'EntryTitle2';
    entry.updatedAt = new Date();
    await repository.save(entry);

    // then
    expect(title).not.toEqual(entry.title);
    expect(updatedAt).not.toEqual(entry.updatedAt);
    await repository.delete(entry.id);
  });

  it('Delete a model', async () => {
    // given => has a model (repository.create())
    const entry = await repository.create({
      title: 'EntryTitle1',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      kanaStatus: 'とらまたいとる',
      startAt: '2022-04-01',
      endAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await repository.save(entry);

    // when
    await repository.delete(entry.id);

    // then
    const deletedEntry = await repository.findOne({
      id: entry.id,
    });
    expect(deletedEntry).toEqual(undefined);
  });
});
