import { Controller, Post } from '@nestjs/common';

@Controller('drama')
export class DramaController {
  @Post()
  addDrama() {
    return 1;
  }
}
