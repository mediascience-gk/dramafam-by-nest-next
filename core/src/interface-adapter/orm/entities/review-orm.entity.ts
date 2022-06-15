import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DramaOrmEntity } from './drama-orm.entity';
import { Age, allAge } from '../../../models/drama/dtos/enums/age.enum';
import {
  allGender,
  Gender,
} from '../../../models/drama/dtos/enums/gender.enum';

@Entity('reviews')
export class ReviewOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar', width: 80 })
  commentator: string | null;

  @Column({ nullable: true, type: 'enum', enum: allAge })
  age: Age | null;

  @Column({ nullable: true, type: 'enum', enum: allGender })
  gender: Gender | null;

  @Column({ nullable: true, type: 'tinyint' })
  ratingOfGeneral: number | null;

  @Column({ nullable: true, type: 'tinyint' })
  ratingOfStory: number | null;

  @Column({ nullable: true, type: 'tinyint' })
  ratingOfCast: number | null;

  @Column({ nullable: true, type: 'tinyint' })
  ratingOfProduction: number | null;

  @Column({ nullable: true, type: 'tinyint' })
  ratingOfMusic: number | null;

  @Column({ nullable: true, type: 'tinyint' })
  ratingOfImpression: number | null;

  @Column({ nullable: true, type: 'tinyint' })
  ratingOfComedy: number | null;

  @Column({ nullable: true, type: 'tinyint' })
  ratingOfThrill: number | null;

  @Column('text')
  body: string;

  @ManyToOne(() => DramaOrmEntity, (drama) => drama.reviews, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  drama: DramaOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
