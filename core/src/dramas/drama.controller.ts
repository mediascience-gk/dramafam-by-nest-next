import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common';

@Controller('drama')
export class DramaController {
  @Post()
  addDrama(@Body() data: any) {
    if (!data?.season) {
      throw new BadRequestException();
    }

    return 1;
  }
}
