import { Module } from '@nestjs/common';

import { DramaModule } from './entries/drama.module';
import { CommentModule } from './comments/comment.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommentModule, DramaModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
