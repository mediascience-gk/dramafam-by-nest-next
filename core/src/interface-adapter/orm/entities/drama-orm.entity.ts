import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { ReviewOrmEntity } from './review-orm.entity';
import { SeasonOrmEntity } from './season-orm.entity';

@Entity('dramas')
export class DramaOrmEntity {
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

  @OneToMany(() => ReviewOrmEntity, (review) => review.drama, { cascade: true })
  reviews: ReviewOrmEntity[];

  @ManyToMany((type) => SeasonOrmEntity)
  @JoinTable()
  seasons: SeasonOrmEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
