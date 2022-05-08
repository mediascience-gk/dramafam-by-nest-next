# TypeORM

## QueryBuilderのJoin

### 例１
```
const dramas = await createQueryBuilder('DramaEntity', 'd')
  .select(['d.id', 'r.body'])
  .innerJoin('d.reviews', 'r')
  .where('d.id = :id', { id: 1 })
  .getOne();
```

### 例2
```
 const dramas = await this.dramaRepository
   .createQueryBuilder()
   .select(['dramas.id', 'reviews.id'])
   .from('DramaEntity', 'dramas')
   .leftJoin('dramas.reviews', 'reviews')
   .getOne();
```
