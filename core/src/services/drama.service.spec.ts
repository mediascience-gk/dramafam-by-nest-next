import { Test, TestingModule } from '@nestjs/testing';
import { DramaService } from './drama.service';
import { StaticDramaRepository } from '../interface-adapter/gateways/drama/drama.repository';
import { DramaRepository } from '../models/drama/drama.repository';
import { Drama } from '../models/drama/drama';
import { CreateDramaDto } from './dto/create-drama.dto';

describe('DramaService', () => {
  let service: DramaService;
  let stubDramaRepository: Partial<DramaRepository>;
  let mockCreateDramaDto: CreateDramaDto;

  beforeEach(async () => {
    mockCreateDramaDto = {
      title: 'DramaTitle',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      startAt: '2022-04-01',
      endAt: null,
    };

    stubDramaRepository = {
      findById: (id: number) => {
        return Promise.resolve({
          id,
          title: 'DramaTitle',
          permalink: 'drama-title',
          kana: 'ドラマタイトル',
        } as Drama);
      },
      create: (creteDramaDto: CreateDramaDto) => {
        return Promise.resolve({
          id: 1,
          title: 'DramaTitle',
          permalink: 'drama-title',
          kana: 'ドラマタイトル',
        } as Drama);
      },
      findAll: () => {
        return Promise.resolve([
          {
            id: 1,
            title: 'DramaTitle',
            permalink: 'drama-title',
            kana: 'ドラマタイトル',
          } as Drama,
          {
            id: 2,
            title: 'DramaTitle',
            permalink: 'drama-title',
            kana: 'ドラマタイトル',
          } as Drama,
        ]);
      },
      delete: (id) => {
        return Promise.resolve();
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DramaService,
        { provide: StaticDramaRepository, useValue: stubDramaRepository },
      ],
    }).compile();

    service = module.get<DramaService>(DramaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findById', async () => {
    const drama = await service.findById(1);
    expect(drama.id).toBe(1);
  });

  it('create', async () => {
    const drama = await service.create(mockCreateDramaDto);
    expect(drama.id).toBe(1);
  });

  it('findAll', async () => {
    const dramas = await service.findAll();
    expect(dramas.length).toBe(2);
  });

  it('remove', async () => {
    expect(service.remove(1)).toBeDefined();
  });
});
