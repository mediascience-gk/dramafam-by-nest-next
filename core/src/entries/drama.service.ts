import { Injectable, NotFoundException } from '@nestjs/common';
import { DramaEntity } from '../entities/drama.entity';
import { DramaRepository } from './drama.repository';
import { CreateDramaDto } from './dto/create-drama.dto';

@Injectable()
export class DramaService {
  constructor(private dramaRepository: DramaRepository) {}

  async create(createDramaDto: CreateDramaDto): Promise<DramaEntity> {
    return await this.dramaRepository.createDrama(createDramaDto);
  }

  findAll(): Promise<DramaEntity[]> {
    return this.dramaRepository.find();
  }

  async findOne(id: number): Promise<DramaEntity> {
    const found = await this.dramaRepository.findOne(id, {
      relations: ['comments'],
    });
    if (found === undefined) {
      throw new NotFoundException();
    }
    return found;
  }

  async remove(id: string): Promise<void> {
    await this.dramaRepository.delete(id);
  }
}
