import { Module } from '@nestjs/common';

import { DramaModule } from './modules/drama.module';
import { CommentModule } from './modules/comment.module';
import { CommonModule } from './modules/common.module';

@Module({
  imports: [CommentModule, DramaModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
