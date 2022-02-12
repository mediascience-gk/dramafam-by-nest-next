import { Controller, Get } from '@nestjs/common';
import { EntryService } from '../services/entry.service';

@Controller()
export class EntryController {
  constructor(private readonly appService: EntryService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
