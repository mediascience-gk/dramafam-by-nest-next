import { Module } from '@nestjs/common';

import { DramaModule } from './modules/drama.module';
import { ReviewModule } from './modules/review.module';
import { CommonModule } from './modules/common.module';

@Module({
  imports: [ReviewModule, DramaModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
