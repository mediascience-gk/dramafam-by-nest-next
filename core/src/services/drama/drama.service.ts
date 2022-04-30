import { Injectable } from '@nestjs/common';
import { StaticDramaRepository } from '../../interface-adapter/gateways/drama/drama.repository';
import { CreateDramaDto } from './dtos/create-drama.dto';
import { Drama } from '../../models/drama/drama';
import { ValidateCreateDramaDataService } from './validate-create-drama-data.service';

@Injectable()
export class DramaService {
  constructor(
    private dramaRepository: StaticDramaRepository,
    private validateCreateDramaDataService: ValidateCreateDramaDataService,
  ) {}

  async create(createDramaDto: CreateDramaDto): Promise<Drama> {
    this.validateCreateDramaDataService.validateDto(createDramaDto);
    return await this.dramaRepository.create(createDramaDto);
  }

  async findAll(): Promise<Drama[]> {
    return await this.dramaRepository.findAll();
  }

  async findById(id: number): Promise<Drama> {
    return await this.dramaRepository.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.dramaRepository.delete(id);
  }
}
