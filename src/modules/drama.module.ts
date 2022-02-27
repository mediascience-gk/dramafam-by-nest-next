import { Module } from '@nestjs/common';
import { DramaController } from '../controllers/drama.controller';

@Module({
  imports: [],
  controllers: [DramaController],
  providers: [],
})
export class DramaModule {}
