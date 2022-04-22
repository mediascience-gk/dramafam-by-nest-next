import { Test, TestingModule } from '@nestjs/testing';
import { DramaService } from './drama.service';
import { StaticDramaRepository } from '../interface-adapter/gateways/drama/drama.repository';
import { DramaRepository } from '../models/drama/drama.repository';

const mockDramaRepository = () => ({});

describe('DramaService', () => {
  let service: DramaService;
  let dramaRepository: DramaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DramaService,
        { provide: StaticDramaRepository, useFactory: mockDramaRepository },
      ],
    }).compile();

    service = module.get<DramaService>(DramaService);
    dramaRepository = module.get<DramaRepository>(StaticDramaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
