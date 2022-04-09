import { Test, TestingModule } from '@nestjs/testing';
import { DramaController } from './drama.controller';

describe('DramaController', () => {
  let controller: DramaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DramaController],
    }).compile();

    controller = module.get<DramaController>(DramaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
