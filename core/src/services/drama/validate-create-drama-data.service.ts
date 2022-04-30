import { CreateDramaDto } from './dtos/create-drama.dto';
import { assert, object, optional, size, string } from 'superstruct';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateCreateDramaDataService {
  assertion = object({
    title: size(string(), 1, 80),
    permalink: size(string(), 1, 80),
    kana: size(string(), 1, 80),
    startAt: string(),
    endAt: optional(string()),
  });

  validateDto(createDramaDto: CreateDramaDto): boolean {
    try {
      assert(createDramaDto, this.assertion);
    } catch (e) {
      const { key, value, type } = e;
      if (value === undefined) {
        throw new Error(`drama_${key}_required`);
      } else if (type === 'never') {
        throw new Error(`drama_attribute_unknown`);
      }
      throw new Error(`drama_${key}_invalid`);
    }
    return true;
  }
}
