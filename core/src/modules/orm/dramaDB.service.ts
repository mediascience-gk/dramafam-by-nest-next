import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DramaModel } from '../../orm/drama.model';

@Injectable()
export class DramaDBService {
  constructor(
    @InjectRepository(DramaModel)
    public dramasRepository: Repository<DramaModel>,
  ) {}
}
