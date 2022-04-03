import { Test } from '@nestjs/testing';
import { EntryModule } from '../../src/modules/entry.module';
import { CommonModule } from '../../src/common/common.module';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EntryModel } from '../../src/orm/entry.model';
import { CommentModel } from '../../src/orm/comment.model';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
class StubEntryService {
  constructor(
    @InjectRepository(EntryModel)
    readonly repo: Repository<EntryModel>,
  ) {}
}

// ORM の CRUD のテストをしたい
describe(EntryModule, () => {
  let repo: Repository<EntryModel>;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        CommonModule,
        TypeOrmModule.forFeature([EntryModel, CommentModel]),
      ],
      providers: [StubEntryService],
    }).compile();

    const s = moduleFixture.get<StubEntryService>(StubEntryService);
    repo = s.repo;
  });

  xit('Create a model', () => {
    // given => zero model
  });

  it('Read a model', async () => {
    // given => has a model (repo.create())

    // when
    const data = await repo.find();

    // then
    expect(data.length).toEqual(0);
  });

  xit('Update a model', () => {});

  xit('Delete a model', () => {});
});
