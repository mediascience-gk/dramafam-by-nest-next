import { Test, TestingModule } from '@nestjs/testing';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from '@nestjs/common';

import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { EntryModel } from '../entities/entry.model';
import { CreateEntryDto } from './dto/create-entry.dto';

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
    mockCreateEntryDto = {
      title: 'DramaTitle',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      startAt: '2022-04-01',
      endAt: null,
    };

    mockEntryService = {
      create: (createEntryDto: CreateEntryDto) => {
        return Promise.resolve({
          id: 1,
          ...mockCreateEntryDto,
          kanaStatus: 'とらまたいとる',
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
