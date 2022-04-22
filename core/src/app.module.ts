import { Module } from '@nestjs/common';

import { DramaModule } from './drama.module';
import { CommentModule } from './comment.module';
import { CommonModule } from './common.module';

@Module({
  imports: [CommentModule, DramaModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
