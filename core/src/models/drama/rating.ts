export class Rating {
  general: RatingItem;
  cast: RatingItem;
  story: RatingItem;
  production: RatingItem;
  impression: RatingItem;
  music: RatingItem;
  comedy: RatingItem;
  thrill: RatingItem;
}

type RatingItem = {
  score: number | null;
  rank?: number | null;
};
