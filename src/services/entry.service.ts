import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntryModel } from '../models/entry.model';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(EntryModel)
    private entriesRepository: Repository<EntryModel>,
  ) {}

  findAll(): Promise<EntryModel[]> {
    return this.entriesRepository.find();
  }

  findOne(id: number): Promise<EntryModel | undefined> {
    return this.entriesRepository.findOne(id, { relations: ['comments'] });
  }

  async remove(id: string): Promise<void> {
    await this.entriesRepository.delete(id);
  }
}
