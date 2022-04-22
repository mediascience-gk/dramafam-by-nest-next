import { DramaEntity } from '../entities/drama.entity';
import { CreateDramaDto } from '../../../services/dto/create-drama.dto';
import { convertKanaToKanaStatus } from '../../../utils/kanaStatus/convertKanaToKanaStatus';
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
    const { title, permalink, kana, startAt, endAt } = createDramaDto;
    const kanaStatus = convertKanaToKanaStatus(kana);
    const createdAt = new Date();
    const updatedAt = new Date();
    const drama = this.repository.create({
      title,
      permalink,
      kana,
      kanaStatus,
      startAt,
      endAt,
      createdAt,
      updatedAt,
    });
    await this.repository.save(drama);
    const { id } = drama;

    return new Drama(
      id,
      title,
      permalink,
      kana,
      new Date(startAt),
      endAt ? new Date(endAt) : undefined,
    );
  }

  async findAll(): Promise<Drama[]> {
    const dramaEntities = await this.repository.find();
    const dramas = dramaEntities.map<Drama>((drama: DramaEntity) => {
      const { id, title, permalink, kana, startAt, endAt } = drama;
      return new Drama(
        id,
        title,
        permalink,
        kana,
        new Date(startAt),
        endAt ? new Date(endAt) : undefined,
      );
    });
    return dramas;
  }

  async findById(id: number): Promise<Drama> {
    const drama = await this.repository.findOne(id, {
      relations: ['comments'],
    });
    if (!drama) {
      throw new NotFoundException('該当ドラマは見つかりませんでした');
    }
    const { title, permalink, kana, startAt, endAt } = drama;
    return new Drama(
      id,
      title,
      permalink,
      kana,
      new Date(startAt),
      endAt ? new Date(endAt) : undefined,
    );
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
