import { DramaEntity } from '../entities/drama.entity';
import { CreateDramaDto } from '../../../services/drama/dtos/create-drama.dto';
import { convertKanaToKanaStatus } from '../../../utils/kana-status/convert-kana-to-kana-status';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DramaRepository } from '../../../models/drama/drama.repository';
import { Drama, DramaPresentation } from '../../../models/drama/drama';
import { ValidateCreateDramaDataService } from '../../../services/drama/validate-create-drama-data.service';
import { StaticReviewRepository } from '../review/review.repository';

@Injectable()
export class StaticDramaRepository implements DramaRepository {
  constructor(
    @InjectRepository(DramaEntity)
    private repository: Repository<DramaEntity>,
    private readonly reviewRepository: StaticReviewRepository,
    private validateCreateDramaDataService: ValidateCreateDramaDataService,
  ) {}

  async create(createDramaDto: CreateDramaDto): Promise<Drama> {
    this.validateCreateDramaDataService.validateDto(createDramaDto);

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

  private convertEntityToModel(dramaEntity: DramaEntity): Drama {
    const { id, title, permalink, kana, startAt, endAt } = dramaEntity;
    return new Drama(
      id,
      title,
      permalink,
      kana,
      async (dramaId) => await this.reviewRepository.findAllByDramaId(dramaId),
      new Date(startAt),
      endAt ? new Date(endAt) : undefined,
    );
  }

  public static convertEntityToPresentation(
    dramaEntity: DramaEntity,
  ): DramaPresentation {
    const { id, title, permalink, kana } = dramaEntity;
    return { id, title, permalink, kana };
  }
}
