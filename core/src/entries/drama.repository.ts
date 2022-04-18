import { EntityRepository, Repository } from 'typeorm';
import { DramaEntity } from '../entities/drama.entity';
import { CreateDramaDto } from './dto/create-drama.dto';
import { convertKanaToKanaStatus } from '../common/use-cases/convertKanaToKanaStatus';

@EntityRepository(DramaEntity)
export class DramaRepository extends Repository<DramaEntity> {
  async createDrama(createDramaDto: CreateDramaDto): Promise<DramaEntity> {
    const { title, permalink, kana, startAt, endAt } = createDramaDto;
    const drama = this.create({
      title,
      permalink,
      kana,
      kanaStatus: convertKanaToKanaStatus(kana),
      startAt,
      endAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.save(drama);

    return drama;
  }
}
