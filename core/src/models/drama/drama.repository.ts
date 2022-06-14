import { Drama } from './drama';
import { CreateDramaDto } from './dtos/create-drama.dto';

export abstract class DramaRepository {
  abstract findById: (id: number) => Promise<Drama>;

  abstract create: (creteDramaDto: CreateDramaDto) => Promise<Drama>;

  abstract findAll: () => Promise<Drama[]>;

  abstract delete: (id: number) => Promise<void>;
}
