import { Test, TestingModule } from '@nestjs/testing';
import { StaticSeasonRepository } from './static-season.repository';
import { Season } from '../../../../models/season/season';
import { SeasonOrmEntity } from '../../entities/season-orm.entity';
import { SeasonOrmRepository } from '../../repositories';

const mockSeasonEntityRepository = () => ({
  create: (seasonOrmEntity: SeasonOrmEntity): Promise<SeasonOrmEntity> => {
    return Promise.resolve({
      id: 1,
      year: 2022,
      month: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
});

describe('StaticSeasonRepository', () => {
  let seasonRepository: StaticSeasonRepository;
  let wrapSeasonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaticSeasonRepository,
        {
          provide: SeasonOrmRepository,
          useFactory: mockSeasonEntityRepository,
        },
      ],
    }).compile();

    seasonRepository = module.get<StaticSeasonRepository>(
      StaticSeasonRepository,
    );
    wrapSeasonRepository = module.get<SeasonOrmRepository>(SeasonOrmRepository);
  });

  it('should be defined', () => {
    expect(seasonRepository).toBeDefined();
  });

  it('create', async () => {
    const season = await seasonRepository.create({ year: 2022, month: 1 });
    expect(season).toBeInstanceOf(Season);
    expect(season.year).toBe(2022);
    expect(season.month).toBe(1);
  });

  it('convertEntityToModel', () => {
    const season = StaticSeasonRepository.convertOrmEntityToModel({
      id: 1,
      year: 2022,
      month: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(season).toBeInstanceOf(Season);
    expect(season.year).toBe(2022);
    expect(season.month).toBe(1);
  });
});
