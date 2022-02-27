import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('dramas')
export class DramaModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  season: string;

  @Column()
  permalink: string;

  @Column()
  kana: string;

  @Column()
  kanaStatus: string;

  @Column()
  tvCompany: string;

  @CreateDateColumn()
  startAt: Date;

  @UpdateDateColumn()
  endAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}