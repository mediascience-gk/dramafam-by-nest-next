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

  @Column()
  title: string;

  @Column()
  permalink: string;

  @Column()
  kana: string;

  @Column()
  kanaStatus: string;

  @Column()
  startAt: string;

  @Column({ nullable: true, type: 'varchar', width: 64 })
  endAt: string | null;

  @OneToMany(() => ReviewEntity, (review) => review.drama, { cascade: true })
  reviews: ReviewEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
