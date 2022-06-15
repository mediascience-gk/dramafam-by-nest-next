import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { allMonth, Month } from '../../../models/season/dtos/enums/month.enum';

@Entity('seasons')
export class SeasonOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'smallint' })
  year: number;

  @Column({ nullable: false, type: 'enum', enum: allMonth })
  month: Month;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
