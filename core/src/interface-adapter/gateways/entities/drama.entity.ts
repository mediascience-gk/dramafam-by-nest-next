import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ReviewEntity } from './review.entity';

@Entity('dramas')
export class DramaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  title: string;

  @Column({ length: 80 })
  permalink: string;

  @Column({ length: 80 })
  kana: string;

  @Column({ length: 80 })
  kanaStatus: string;

  @Column({ length: 10, width: 64 })
  startAt: string;

  @Column({ nullable: true, type: 'varchar', length: 10, width: 64 })
  endAt: string | null;

  @OneToMany(() => ReviewEntity, (review) => review.drama, { cascade: true })
  reviews: ReviewEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
