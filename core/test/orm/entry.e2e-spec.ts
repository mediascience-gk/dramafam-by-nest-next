import { Test } from '@nestjs/testing';
import { EntryModule } from '../../src/entries/entry.module';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EntryModel } from '../../src/entities/entry.model';
import { CommentModel } from '../../src/entities/comment.model';
import { Injectable } from '@nestjs/common';
import { EntryRepository } from '../../src/entries/entry.repository';
import { CommonSpecModule } from '../../src/common/common-spec.module';

@Injectable()
class StubEntryService {
  constructor(
    @InjectRepository(EntryModel)
    readonly repository: EntryRepository,
  ) {}
}

// ORM の CRUD のテストをしたい
describe(EntryModule, () => {
  let repository: EntryRepository;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        CommonSpecModule,
        TypeOrmModule.forFeature([EntryModel, CommentModel]),
      ],
      providers: [StubEntryService, EntryRepository],
    }).compile();

    const entryService = moduleFixture.get<StubEntryService>(StubEntryService);
    repository = entryService.repository;
  });

  it('Create a model', async () => {
    // given => zero model

    // when
    const entry = await repository.create({
      title: 'EntryTitle1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await repository.save(entry);

    // when (custom repository)
    // const createEntryDto: CreateEntryDto = {
    //   title: 'EntryTitle',
    // };
    // const entry = await repository.createEntry(createEntryDto);

    // then
    expect(entry.title).toEqual('EntryTitle1');
    await repository.delete(entry.id);
  });

  it('Read a model', async () => {
    // given => has a model (repository.create())
    const entry = await repository.create({
      title: 'EntryTitle1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
