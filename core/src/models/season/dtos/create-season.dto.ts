import { allMonth, Month } from './enums/month.enum';
import { IsEnum, IsInt } from 'class-validator';

export class CreateSeasonDto {
  @IsInt()
  year: number;

  @IsEnum(allMonth)
  month: Month;
}
