import { Module } from '@nestjs/common';
import { DramaController } from '../controllers/drama.controller';
import { DramaService } from '../services/drama.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DramaEntity } from '../interface-adapter/gateways/entities/drama.entity';
import { StaticDramaRepository } from '../interface-adapter/gateways/drama/drama.repository';
import { CommentService } from '../services/comment.service';
import { StaticCommentRepository } from '../interface-adapter/gateways/comment/comment.repository';
import { CommentEntity } from '../interface-adapter/gateways/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DramaEntity, CommentEntity])],
  controllers: [DramaController],
  providers: [
    DramaService,
    CommentService,
    StaticDramaRepository,
    StaticCommentRepository,
  ],
})
export class DramaModule {}
