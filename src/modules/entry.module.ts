import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryController } from '../controllers/entry.controller';
import { EntryService } from '../services/entry.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
