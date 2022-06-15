import { Month } from './dtos/enums/month.enum';

export class Season {
  constructor(readonly year: number, readonly month: Month) {}
}
