import { Module } from '@nestjs/common';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticCommentRepository } from './interface-adapter/gateways/comment/comment.repository';
import { DramaModule } from './drama.module';
import { DramaService } from './services/drama.service';
import { DramaEntity } from './interface-adapter/gateways/entities/drama.entity';
import { StaticDramaRepository } from './interface-adapter/gateways/drama/drama.repository';
import { CommentEntity } from './interface-adapter/gateways/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, DramaEntity]),
    DramaModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    DramaService,
    StaticDramaRepository,
    StaticCommentRepository,
  ],
})
export class CommentModule {}
