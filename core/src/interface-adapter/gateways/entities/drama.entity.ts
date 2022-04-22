import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CommentEntity } from './comment.entity';

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

  @OneToMany(() => CommentEntity, (comment) => comment.drama, { cascade: true })
  comments: CommentEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
