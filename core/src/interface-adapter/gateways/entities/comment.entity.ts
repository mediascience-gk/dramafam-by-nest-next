import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DramaEntity } from './drama.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  body: string;

  @ManyToOne(() => DramaEntity, (drama) => drama.comments, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  drama: DramaEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
