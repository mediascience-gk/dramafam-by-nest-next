import { Test, TestingModule } from '@nestjs/testing';
import { DramaService } from './drama.service';
import { DramaRepository } from './drama.repository';

const mockDramaRepository = () => ({});

describe('DramaService', () => {
  let service: DramaService;
  let dramaRepository: DramaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DramaService,
        { provide: DramaRepository, useFactory: mockDramaRepository },
      ],
    }).compile();

    service = module.get<DramaService>(DramaService);
    dramaRepository = module.get<DramaRepository>(DramaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
