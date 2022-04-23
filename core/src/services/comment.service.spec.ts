import { CommentRepository } from '../models/comment/comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { Test, TestingModule } from '@nestjs/testing';
import { StaticCommentRepository } from '../interface-adapter/gateways/comment/comment.repository';
import { Comment } from '../models/comment/comment';
import { DramaService } from './drama.service';
import { Drama } from '../models/drama/drama';

describe('DramaService', () => {
  let service: CommentService;
  let stubDramaService: Partial<DramaService>;
  let stubCommentRepository: Partial<CommentRepository>;
  let mockCreateCommentDto: CreateCommentDto;

  beforeEach(async () => {
    mockCreateCommentDto = {
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

    stubCommentRepository = {
      create: (createCommentDto: CreateCommentDto) => {
        return Promise.resolve({
          id: 1,
          body: 'コメント',
          drama: {
            id: 1,
            title: 'DramaTitle',
            permalink: 'drama-title',
            kana: 'ドラマタイトル',
          },
        } as Comment);
      },
      delete: (id) => {
        return Promise.resolve();
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        { provide: DramaService, useValue: stubDramaService },
        { provide: StaticCommentRepository, useValue: stubCommentRepository },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const drama = await service.create(mockCreateCommentDto);
    expect(drama.id).toBe(1);
  });

  it('remove', async () => {
    expect(service.remove(1)).toBeDefined();
  });
});
