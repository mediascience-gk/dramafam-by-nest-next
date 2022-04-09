import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  title: string;
}
