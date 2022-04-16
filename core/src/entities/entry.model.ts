import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CommentModel } from './comment.model';

@Entity('entries')
export class EntryModel {
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

  @OneToMany(() => CommentModel, (comment) => comment.entry)
  comments: CommentModel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
