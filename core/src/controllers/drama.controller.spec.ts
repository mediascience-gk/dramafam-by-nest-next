import { Test, TestingModule } from '@nestjs/testing';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { INestApplication, ValidationError } from '@nestjs/common';

import { DramaController } from './drama.controller';
import { DramaService } from '../services/drama/drama.service';
import { CreateDramaDto } from '../services/drama/dtos/create-drama.dto';
import { Drama } from '../models/drama/drama';
import { ReviewService } from '../services/review/review.service';

describe('DramaController', () => {
  let app: INestApplication;
  let controller: DramaController;
  let stubDramaService: Partial<DramaService>;
  let stubCommentService: Partial<ReviewService>;
  let mockCreateDramaDto: CreateDramaDto;

  const validateDto = (
    cls: ClassConstructor<unknown>,
    plain: unknown,
  ): Promise<ValidationError[]> => {
    const instance: any = plainToInstance(cls, plain);
    return validate(instance);
  };

  beforeEach(async () => {
    mockCreateDramaDto = {
      title: 'DramaTitle',
      permalink: 'drama-title',
      kana: 'ドラマタイトル',
      startAt: '2022-04-01',
      endAt: null,
    };

    stubDramaService = {
      create: (createDramaDto: CreateDramaDto) => {
        return Promise.resolve({
          id: 1,
          ...mockCreateDramaDto,
        } as Drama);
      },
    };

    stubCommentService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DramaController],
      providers: [
        { provide: DramaService, useValue: stubDramaService },
        { provide: ReviewService, useValue: stubCommentService },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<DramaController>(DramaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('管理者が、正規のドラマ情報を送信すると、新規でドラマが追加される', () => {
    it('createメソッド', async () => {
      const result = await controller.create(mockCreateDramaDto);
      expect(result.title).toEqual(mockCreateDramaDto.title);
    });

    it('バリデーション通過', async () => {
      const errors = await validateDto(CreateDramaDto, mockCreateDramaDto);
      expect(errors.length).toBe(0);
    });
  });

  describe('管理者が、不正なドラマ情報を送信すると、エラーが返る', () => {
    it('title: ドラマ名が未入力(空文字)', async () => {
      const drama = { ...mockCreateDramaDto };
      drama.title = '';
      const errors = await validateDto(CreateDramaDto, drama);
      expect(errors.length).not.toBe(0);
    });

    it('title: ドラマ名が未入力(null)', async () => {
      const drama = { ...mockCreateDramaDto };
      drama.title = null!;
      const errors = await validateDto(CreateDramaDto, drama);
      expect(errors.length).not.toBe(0);
    });

    it('permalink: パーマリンクが未入力(空文字)', async () => {
      const drama = { ...mockCreateDramaDto };
      drama.permalink = '';
      const errors = await validateDto(CreateDramaDto, drama);
      expect(errors.length).not.toBe(0);
    });

    it('permalink: パーマリンクが未入力(null)', async () => {
      const drama = { ...mockCreateDramaDto };
      drama.permalink = null!;
      const errors = await validateDto(CreateDramaDto, drama);
      expect(errors.length).not.toBe(0);
    });

    it('kana: 読み方が未入力(空文字)', async () => {
      const drama = { ...mockCreateDramaDto };
      drama.kana = '';
      const errors = await validateDto(CreateDramaDto, drama);
      expect(errors.length).not.toBe(0);
    });

    it('kana: 読み方が未入力(null)', async () => {
      const drama = { ...mockCreateDramaDto };
      drama.kana = null!;
      const errors = await validateDto(CreateDramaDto, drama);
      expect(errors.length).not.toBe(0);
    });

    it('kana: [ひらがなorカタカナ]以外が入力された場合', async () => {
      const drama = { ...mockCreateDramaDto };
      drama.kana = '漢字';
      const errors = await validateDto(CreateDramaDto, drama);
      expect(errors.length).not.toBe(0);
    });

    it('startAt: 開始日が未入力(空文字)', async () => {
      const drama = { ...mockCreateDramaDto };
      drama.startAt = '';
      const errors = await validateDto(CreateDramaDto, drama);
      expect(errors.length).not.toBe(0);
    });

    it('startAt: 開始日が未入力(null)', async () => {
      const drama = { ...mockCreateDramaDto };
      drama.startAt = null!;
      const errors = await validateDto(CreateDramaDto, drama);
      expect(errors.length).not.toBe(0);
    });
  });
});
