import { Test, TestingModule } from '@nestjs/testing';
import { EntryService } from './entry.service';
import { EntryRepository } from './entry.repository';

const mockEntryRepository = () => ({});

describe('EntryService', () => {
  let service: EntryService;
  let entryRepository: EntryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryService,
        { provide: EntryRepository, useFactory: mockEntryRepository },
      ],
    }).compile();

    service = module.get<EntryService>(EntryService);
    entryRepository = module.get<EntryRepository>(EntryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
