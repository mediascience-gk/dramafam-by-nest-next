import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { EntryModel } from '../entities/entry.model';

describe('EntryController', () => {
  let controller: EntryController;
  let mockEntryService: Partial<EntryService>;

  beforeEach(async () => {
    mockEntryService = {
      create: (createEntryDto: CreateEntryDto) => {
        return Promise.resolve({
          id: 1,
          title: 'DramaTitle',
          comments: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        } as EntryModel);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryController],
      providers: [{ provide: EntryService, useValue: mockEntryService }],
    }).compile();

    controller = module.get<EntryController>(EntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('create', async () => {
      const expected: CreateEntryDto = {
        title: 'DramaTitle',
      };
      const result = await controller.create(expected);
      expect(result.title).toEqual(expected.title);
    });

    it('should success on valid DTO', async () => {
      // Validation
      const createEntryDto: CreateEntryDto = {
        title: 'DramaTitle',
      };
      const createEntryDtoObject = plainToInstance(
        CreateEntryDto,
        createEntryDto,
      );
      const errors = await validate(createEntryDtoObject);
      expect(errors.length).toBe(0);
    });

    it('should fail on invalid DTO', async () => {
      const createEntryDto: CreateEntryDto = {
        title: '',
      };
      const createEntryDtoObject = plainToInstance(
        CreateEntryDto,
        createEntryDto,
      );
      const errors = await validate(createEntryDtoObject);
      expect(errors.length).not.toBe(0);
    });
  });
});
