import { SeasonRepository } from '../../../../models/season/season.repository';
import { Season } from '../../../../models/season/season';
import { SeasonOrmEntity } from '../../entities/season-orm.entity';
import { CreateSeasonDto } from '../../../../models/season/dtos/create-season.dto';
import { Injectable } from '@nestjs/common';
import { SeasonOrmRepository } from '../../repositories';

@Injectable()
export class StaticSeasonRepository implements SeasonRepository {
  constructor(private repository: SeasonOrmRepository) {}

  async create(createSeasonDto: CreateSeasonDto) {
    const seasonOrmEntity = await this.repository.create({
      ...createSeasonDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return StaticSeasonRepository.convertOrmEntityToModel(seasonOrmEntity);
  }

  async findById() {
    return Promise.resolve({
      year: 2022,
      month: 1,
    } as Season);
  }

  async delete(id: number) {
    return Promise.resolve();
  }

  static convertOrmEntityToModel(seasonOrmEntity: SeasonOrmEntity) {
    const { year, month } = seasonOrmEntity;
    return new Season(year, month);
  }
}
