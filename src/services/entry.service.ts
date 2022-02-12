import { Injectable } from '@nestjs/common';

@Injectable()
export class EntryService {
  getHello(): string {
    return 'Hello World!';
  }
}
