import { Injectable, NotFoundException } from '@nestjs/common';
import { EntryModel } from '../entities/entry.model';
import { EntryRepository } from './entry.repository';
import { CreateEntryDto } from './dto/create-entry.dto';

@Injectable()
export class EntryService {
  constructor(private entryRepository: EntryRepository) {}

  async create(createEntryDto: CreateEntryDto): Promise<EntryModel> {
    return await this.entryRepository.createEntry(createEntryDto);
  }

  findAll(): Promise<EntryModel[]> {
    return this.entryRepository.find();
  }

  async findOne(id: number): Promise<EntryModel> {
    const found = await this.entryRepository.findOne(id, {
      relations: ['comments'],
    });
    if (found === undefined) {
      throw new NotFoundException();
    }
    return found;
  }

  async remove(id: string): Promise<void> {
    await this.entryRepository.delete(id);
  }
}
