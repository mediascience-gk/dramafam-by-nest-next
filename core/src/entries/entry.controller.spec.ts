import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { EntryModel } from '../entities/entry.model';
import { ValidationError } from '@nestjs/common';
import { ConvertKanaToKanaStatus } from '../common/use-cases/convertKanaToKanaStatus';

describe('EntryController', () => {
  let controller: EntryController;
  let mockEntryService: Partial<EntryService>;
  let mockCreateEntryDto: CreateEntryDto;

  const validateDto = (
    cls: ClassConstructor<unknown>,
    plain: unknown,
  ): Promise<ValidationError[]> => {
    const instance: any = plainToInstance(cls, plain);
    return validate(instance);
  };

  beforeEach(async () => {
    const kana = 'ドラマタイトル';
    const convertKanaToKanaStatus = new ConvertKanaToKanaStatus(kana);
    const kanaStatus = convertKanaToKanaStatus.convert();

    mockCreateEntryDto = {
      title: 'DramaTitle',
      permalink: 'drama-title',
      kana,
      kanaStatus,
      startAt: '2022-04-01',
      endAt: null,
    };

    mockEntryService = {
      create: (createEntryDto: CreateEntryDto) => {
        return Promise.resolve({
          id: 1,
          ...mockCreateEntryDto,
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

  describe('管理者が、正規のドラマ情報を送信すると、新規でドラマが追加される', () => {
    it('createメソッド', async () => {
      const result = await controller.create(mockCreateEntryDto);
      expect(result.title).toEqual(mockCreateEntryDto.title);
    });

    it('バリデーション通過', async () => {
      const errors = await validateDto(CreateEntryDto, mockCreateEntryDto);
      expect(errors.length).toBe(0);
    });

    describe('ConvertKanaToKanaStatusが機能している', () => {
      it('カタカナの変換', () => {
        const convertKanaToKanaStatus = new ConvertKanaToKanaStatus(
          'タチツテト',
        );
        const kanaStatus = convertKanaToKanaStatus.convert();
        expect(kanaStatus).toBe('たちつてと');
      });
      it('濁点を含む変換', () => {
        const convertKanaToKanaStatus = new ConvertKanaToKanaStatus(
          'だだだぢぢぢづづづでででどどど',
        );
        const kanaStatus = convertKanaToKanaStatus.convert();
        expect(kanaStatus).toBe('たたたちちちつつつてててととと');
      });
      it('小文字を含む変換', () => {
        const convertKanaToKanaStatus = new ConvertKanaToKanaStatus(
          'ぁぁぁぃぃぃぅぅぅぇぇぇぉぉぉ',
        );
        const kanaStatus = convertKanaToKanaStatus.convert();
        expect(kanaStatus).toBe('あああいいいうううえええおおお');
      });
    });
  });

  describe('管理者が、不正なドラマ情報を送信すると、エラーが返る', () => {
    it('title: ドラマ名が未入力(空文字)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.title = '';
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('title: ドラマ名が未入力(null)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.title = null!;
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('permalink: パーマリンクが未入力(空文字)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.permalink = '';
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('permalink: パーマリンクが未入力(null)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.permalink = null!;
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('kana: 読み方が未入力(空文字)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.kana = '';
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('kana: 読み方が未入力(null)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.kana = null!;
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('kana: [ひらがなorカタカナ]以外が入力された場合', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.kana = '漢字';
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('kanaStatus: kanaStatusが未入力(空文字)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.kanaStatus = '';
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('kanaStatus: kanaStatusが未入力(null)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.kanaStatus = null!;
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('kanaStatus: ひらがな以外が入力された場合（小文字、濁点・半濁点もNG）', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.kanaStatus = 'どらまたいとる';
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('startAt: 開始日が未入力(空文字)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.startAt = '';
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });

    it('startAt: 開始日が未入力(null)', async () => {
      const entry = { ...mockCreateEntryDto };
      entry.startAt = null!;
      const errors = await validateDto(CreateEntryDto, entry);
      expect(errors.length).not.toBe(0);
    });
  });
});
