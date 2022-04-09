import { EntityRepository, Repository } from 'typeorm';
import { EntryModel } from '../entities/entry.model';
import { CreateEntryDto } from './dto/create-entry.dto';

@EntityRepository(EntryModel)
export class EntryRepository extends Repository<EntryModel> {
  async createEntry(createEntryDto: CreateEntryDto): Promise<EntryModel> {
    const { title } = createEntryDto;
    const entry = this.create({
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await this.save(entry);

    return entry;
  }
}