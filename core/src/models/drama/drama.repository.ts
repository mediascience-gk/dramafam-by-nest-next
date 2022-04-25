import { Drama } from './drama';
import { CreateDramaDto } from '../../services/dto/create-drama.dto';

export interface DramaRepository {
  findById(id: number): Promise<Drama>;

  create(creteDramaDto: CreateDramaDto): Promise<Drama>;

  findAll(): Promise<Drama[]>;

  delete(id: number): Promise<void>;
}