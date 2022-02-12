import { Module } from '@nestjs/common';
import { EntryController } from '../controllers/entry.controller';
import { EntryService } from '../services/entry.service';

@Module({
  imports: [],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
