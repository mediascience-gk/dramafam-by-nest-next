import { Injectable } from '@nestjs/common';
import { CreateDramaDto } from '../../models/drama/dtos/create-drama.dto';
import { Drama } from '../../models/drama/drama';
import { ValidateCreateDramaDataService } from './validate-create-drama-data.service';
import { DramaRepository } from '../../models/drama/drama.repository';
import { ReviewRepository } from '../../models/review/review.repository';

@Injectable()
export class DramaService {
  constructor(
    private dramaRepository: DramaRepository,
    private reviewRepository: ReviewRepository,
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
    const drama = await this.dramaRepository.findById(id);
    drama.rating = await this.reviewRepository.getRating(id);
    drama.reviews = await this.reviewRepository.findAllByDramaId(id);
    return drama;
  }

  async remove(id: number): Promise<void> {
    await this.dramaRepository.delete(id);
  }
}
