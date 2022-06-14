import { Season } from './season';

class CreateSeasonDto {}

export abstract class SeasonRepository {
  abstract findById: (id: number) => Promise<Season>;

  abstract create: (createSeasonDto: CreateSeasonDto) => Promise<Season>;

  abstract delete: (id: number) => Promise<void>;
}
