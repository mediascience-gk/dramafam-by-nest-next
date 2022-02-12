import { Test, TestingModule } from '@nestjs/testing';
import { EntryController } from './entry.controller';
import { EntryService } from '../services/entry.service';

describe('EntryController', () => {
  let entryController: EntryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EntryController],
      providers: [EntryService],
    }).compile();

    entryController = app.get<EntryController>(EntryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(entryController.getHello()).toBe('Hello World!');
    });
  });
});
