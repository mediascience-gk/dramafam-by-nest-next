import { DramaEntity } from '../entities/drama.entity';
import { CreateDramaDto } from '../../../services/drama/dtos/create-drama.dto';
import { convertKanaToKanaStatus } from '../../../utils/kana-status/convert-kana-to-kana-status';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DramaRepository } from '../../../models/drama/drama.repository';
import { Drama } from '../../../models/drama/drama';

@Injectable()
export class StaticDramaRepository implements DramaRepository {
  constructor(
    @InjectRepository(DramaEntity)
    private repository: Repository<DramaEntity>,
  ) {}

  async create(createDramaDto: CreateDramaDto): Promise<Drama> {
    const kanaStatus = convertKanaToKanaStatus(createDramaDto.kana);

    const drama = this.repository.create({
      ...createDramaDto,
      kanaStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.repository.save(drama);

    return this.convertEntityToModel(drama);
  }

  async findAll(): Promise<Drama[]> {
    const dramaEntities = await this.repository.find();
    const dramas = dramaEntities.map<Drama>((drama: DramaEntity) => {
      return this.convertEntityToModel(drama);
    });
    return dramas;
  }

  async findById(id: number): Promise<Drama> {
    const drama = await this.repository.findOne(id, {
      relations: ['reviews'],
    });
    if (!drama) {
      throw new NotFoundException('該当ドラマは見つかりませんでした');
    }
    return this.convertEntityToModel(drama);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public convertEntityToModel(dramaEntity: DramaEntity): Drama {
    const { id, title, permalink, kana, startAt, endAt } = dramaEntity;
    return new Drama(
      id,
      title,
      permalink,
      kana,
      new Date(startAt),
      endAt ? new Date(endAt) : undefined,
    );
  }
}
