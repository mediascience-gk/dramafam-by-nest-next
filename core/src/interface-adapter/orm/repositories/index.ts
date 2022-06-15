import { EntityRepository, Repository } from 'typeorm';

import { DramaOrmEntity } from '../entities/drama-orm.entity';
import { ReviewOrmEntity } from '../entities/review-orm.entity';
import { SeasonOrmEntity } from '../entities/season-orm.entity';

@EntityRepository(DramaOrmEntity)
export class DramaOrmRepository extends Repository<DramaOrmEntity> {}

@EntityRepository(ReviewOrmEntity)
export class ReviewOrmRepository extends Repository<ReviewOrmEntity> {}

@EntityRepository(SeasonOrmEntity)
export class SeasonOrmRepository extends Repository<SeasonOrmEntity> {}
