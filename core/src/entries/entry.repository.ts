import { EntityRepository, Repository } from 'typeorm';
import { EntryModel } from '../entities/entry.model';
import { CreateEntryDto } from './dto/create-entry.dto';
import { convertKanaToKanaStatus } from '../common/use-cases/convertKanaToKanaStatus';

@EntityRepository(EntryModel)
export class EntryRepository extends Repository<EntryModel> {
  async createEntry(createEntryDto: CreateEntryDto): Promise<EntryModel> {
    const { title, permalink, kana, startAt, endAt } = createEntryDto;
    const entry = this.create({
      title,
      permalink,
      kana,
      kanaStatus: convertKanaToKanaStatus(kana),
      startAt,
      endAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.save(entry);

    return entry;
  }
}
