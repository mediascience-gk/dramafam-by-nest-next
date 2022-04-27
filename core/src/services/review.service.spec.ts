import { ReviewRepository } from '../models/review/review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { Test, TestingModule } from '@nestjs/testing';
import { StaticReviewRepository } from '../interface-adapter/gateways/review/review.repository';
import { Review } from '../models/review/review';
import { DramaService } from './drama.service';
import { Drama } from '../models/drama/drama';

describe('DramaService', () => {
  let service: ReviewService;
  let stubDramaService: Partial<DramaService>;
  let stubReviewRepository: Partial<ReviewRepository>;
  let mockCreateReviewDto: CreateReviewDto;

  beforeEach(async () => {
    mockCreateReviewDto = {
      body: 'コメント',
      dramaId: 1,
    };

    stubDramaService = {
      findById: (id: number) => {
        return Promise.resolve({
          id: 1,
          title: 'DramaTitle',
          permalink: 'drama-title',
          kana: 'ドラマタイトル',
        } as Drama);
      },
    };

    stubReviewRepository = {
      create: (createReviewDto: CreateReviewDto) => {
        return Promise.resolve({
          id: 1,
          body: 'コメント',
          drama: {
            id: 1,
            title: 'DramaTitle',
            permalink: 'drama-title',
            kana: 'ドラマタイトル',
          },
        } as Review);
      },
      delete: (id) => {
        return Promise.resolve();
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: DramaService, useValue: stubDramaService },
        { provide: StaticReviewRepository, useValue: stubReviewRepository },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const drama = await service.create(mockCreateReviewDto);
    expect(drama.id).toBe(1);
  });

  it('remove', async () => {
    expect(service.remove(1)).toBeDefined();
  });
});
