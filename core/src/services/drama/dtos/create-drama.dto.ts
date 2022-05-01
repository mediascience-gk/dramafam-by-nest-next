import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { Kana } from '../Kana';

export class CreateDramaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  permalink: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  @Transform((value) => new Kana(value.value))
  kana: Kana;

  @IsNotEmpty()
  startAt: string;

  endAt?: string;
}
