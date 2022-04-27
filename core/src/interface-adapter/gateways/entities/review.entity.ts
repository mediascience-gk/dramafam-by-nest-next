import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DramaEntity } from './drama.entity';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  body: string;

  @ManyToOne(() => DramaEntity, (drama) => drama.reviews, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  drama: DramaEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
