import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsKana } from '../../common/decorators/validators/isKana';
import { IsKanaStatus } from '../../common/decorators/validators/isKanaStatus';

export class CreateEntryDto {
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

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  @IsKanaStatus('kanaStatus', {
    message: 'ひらがなでご入力ください',
  })
  kanaStatus: string;

  @IsNotEmpty()
  startAt: string;

  endAt: string | null;
}
