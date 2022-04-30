import { ValidateCreateDramaDataService } from './validate-create-drama-data.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateDramaDto } from './dtos/create-drama.dto';

describe('ValidateCreateDramaService', () => {
  let service: ValidateCreateDramaDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateCreateDramaDataService],
    }).compile();

    service = module.get<ValidateCreateDramaDataService>(
      ValidateCreateDramaDataService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Validation: title', () => {
    it('正常系: titleが80文字ちょうど', () => {
      const createDramaDto: CreateDramaDto = {
        title:
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ',
        permalink: 'drama-title',
        kana: 'ドラマタイトル',
        startAt: '2022-04-01',
      };
      let expected;
      try {
        expected = service.validateDto(createDramaDto);
      } catch (e) {
        expect(1).toBe(0);
      }
      expect(expected).toBe(true);
    });

    it('異常系: titleが80文字以上(81文字)', () => {
      const createDramaDto: CreateDramaDto = {
        title:
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'あ',
        permalink: 'drama-title',
        kana: 'ドラマタイトル',
        startAt: '2022-04-01',
      };
      let expected;
      try {
        expected = service.validateDto(createDramaDto);
      } catch (e) {
        expect(1).toBe(1);
      }
      expect(expected).not.toBe(true);
    });
  });

  describe('Validation: permalink', () => {
    it('正常系: permalinkが80文字ちょうど', () => {
      const createDramaDto: CreateDramaDto = {
        title: 'DramaTitle',
        permalink:
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ',
        kana: 'ドラマタイトル',
        startAt: '2022-04-01',
      };
      let expected;
      try {
        expected = service.validateDto(createDramaDto);
      } catch (e) {
        expect(1).toBe(0);
      }
      expect(expected).toBe(true);
    });

    it('異常系: permalinkが80文字以上(81文字)', () => {
      const createDramaDto: CreateDramaDto = {
        title: 'DramaTitle',
        permalink:
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'あ',
        kana: 'ドラマタイトル',
        startAt: '2022-04-01',
      };
      let expected;
      try {
        expected = service.validateDto(createDramaDto);
      } catch (e) {
        expect(1).toBe(1);
      }
      expect(expected).not.toBe(true);
    });
  });

  describe('Validation: kana', () => {
    it('正常系: kanaが80文字ちょうど', () => {
      const createDramaDto: CreateDramaDto = {
        title: 'DramaTitle',
        permalink: 'drama-title',
        kana:
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ',
        startAt: '2022-04-01',
      };
      let expected;
      try {
        expected = service.validateDto(createDramaDto);
      } catch (e) {
        expect(1).toBe(0);
      }
      expect(expected).toBe(true);
    });

    it('異常系: kanaが80文字以上(81文字)', () => {
      const createDramaDto: CreateDramaDto = {
        title: 'DramaTitle',
        permalink: 'drama-title',
        kana:
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'ああああああああああああああああああああ' +
          'あ',
        startAt: '2022-04-01',
      };
      let expected;
      try {
        expected = service.validateDto(createDramaDto);
      } catch (e) {
        expect(1).toBe(1);
      }
      expect(expected).not.toBe(true);
    });
  });
});
