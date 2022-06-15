import { DramaOrmEntity } from '../../entities/drama-orm.entity';
import { CreateDramaDto } from '../../../../models/drama/dtos/create-drama.dto';
import { convertKanaToKanaStatus } from '../../../../utils/kana-status/convert-kana-to-kana-status';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DramaRepository } from '../../../../models/drama/drama.repository';
import { Drama, DramaPresentation } from '../../../../models/drama/drama';
import { ValidateCreateDramaDataService } from '../../../../services/drama/validate-create-drama-data.service';
import { ReviewRepository } from '../../../../models/review/review.repository';
import { DramaOrmRepository } from '../../repositories';

@Injectable()
export class StaticDramaRepository implements DramaRepository {
  constructor(
    private repository: DramaOrmRepository,
    private readonly reviewRepository: ReviewRepository,
    private validateCreateDramaDataService: ValidateCreateDramaDataService,
  ) {}

  async create(createDramaDto: CreateDramaDto): Promise<Drama> {
    this.validateCreateDramaDataService.validateDto(createDramaDto);

    const kanaStatus = convertKanaToKanaStatus(createDramaDto.kana);

    const dramaOrmEntity = this.repository.create({
      ...createDramaDto,
      kanaStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.repository.save(dramaOrmEntity);

    return this.convertOrmEntityToModel(dramaOrmEntity);
  }

  async findAll(): Promise<Drama[]> {
    const dramaOrmEntities = await this.repository.find({
      order: { createdAt: 'DESC' },
    });
    const dramas = dramaOrmEntities.map<Drama>(
      (dramaOrmEntity: DramaOrmEntity) => {
        return this.convertOrmEntityToModel(dramaOrmEntity);
      },
    );
    return dramas;
  }

  async findById(id: number): Promise<Drama> {
    const dramaOrmEntity = await this.repository.findOne(id, {
      relations: ['reviews'],
    });
    if (!dramaOrmEntity) {
      throw new NotFoundException('該当ドラマは見つかりませんでした');
    }
    return this.convertOrmEntityToModel(dramaOrmEntity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  private convertOrmEntityToModel(dramaOrmEntity: DramaOrmEntity): Drama {
    const { id, title, permalink, kana, startAt, endAt } = dramaOrmEntity;
    return new Drama(
      id,
      title,
      permalink,
      kana,
      new Date(startAt),
      endAt ? new Date(endAt) : undefined,
    );
  }

  public static convertOrmEntityToPresentation(
    dramaOrmEntity: DramaOrmEntity,
  ): DramaPresentation {
    const { id, title, permalink } = dramaOrmEntity;
    return { id, title, permalink };
  }
}
