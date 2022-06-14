import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsKana } from '../../../utils/decorators/validators/isKana';

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
  @IsKana('kana', {
    message: 'ひらがな、またはカタカナでご入力ください',
  })
  kana: string;

  @IsNotEmpty()
  startAt: string;

  endAt?: string;
}
