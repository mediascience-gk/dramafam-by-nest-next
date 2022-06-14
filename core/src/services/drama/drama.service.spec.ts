import { Test, TestingModule } from '@nestjs/testing';
import { DramaService } from './drama.service';
import { DramaRepository } from '../../models/drama/drama.repository';
import { Drama } from '../../models/drama/drama';
import { CreateDramaDto } from '../../models/drama/dtos/create-drama.dto';
import { ValidateCreateDramaDataService } from './validate-create-drama-data.service';
import { ReviewRepository } from '../../models/review/review.repository';
import { Rating } from '../../models/drama/rating';
import { Review } from '../../models/review/review';

describe('DramaService', () => {
  let service: DramaService;
  let stubDramaRepository: Partial<DramaRepository>;
  let stubReviewRepository: Partial<ReviewRepository>;
  let stubValidateCreateDramaDataService: Partial<ValidateCreateDramaDataService>;
  let mockCreateDramaDto: CreateDramaDto;

  beforeEach(async () => {
    mockCreateDramaDto = {
      title: 'DramaTitle',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      startAt: '2022-04-01',
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
    stubReviewRepository = {
      findAllByDramaId: (dramaId) => {
        return Promise.resolve([
          {
            id: 1,
            body: 'review-body',
            drama: {
              id: 2,
              title: 'DramaTitle',
              permalink: 'drama-title',
            },
          } as Review,
        ]);
      },
      getRating: (dramaId: number) => {
        return Promise.resolve({
          general: { score: 5 },
          cast: { score: 5 },
          story: { score: 5 },
          production: { score: 5 },
          impression: { score: 5 },
          music: { score: 5 },
          comedy: { score: 5 },
          thrill: { score: 5 },
        } as Rating);
      },
    };
    stubValidateCreateDramaDataService = {
      validateDto: (createDramaDto: CreateDramaDto) => true,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DramaService,
        { provide: DramaRepository, useValue: stubDramaRepository },
        { provide: ReviewRepository, useValue: stubReviewRepository },
        {
          provide: ValidateCreateDramaDataService,
          useValue: stubValidateCreateDramaDataService,
        },
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
