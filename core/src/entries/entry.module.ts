import { Module } from '@nestjs/common';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryRepository } from './entry.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EntryRepository])],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
