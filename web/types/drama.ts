import { Review } from './review';

export type Drama = {
  id: string;
  title: string;
  permalink: string;
  kana: string;
  _startAt: string;
  reviews: Review[];
  rating: Rating;
  ratingLabels: RatingLabels;
};

export type Rating = {
  general: RatingItem;
  story: RatingItem;
  cast: RatingItem;
  production: RatingItem;
  impression: RatingItem;
  music: RatingItem;
  comedy: RatingItem;
  thrill: RatingItem;
};

export type RatingItem = {
  score: number | null;
  rank?: number | null;
};

export type RatingLabels = {
  general: RatingLabel;
  story: RatingLabel;
  cast: RatingLabel;
  production: RatingLabel;
  impression: RatingLabel;
  music: RatingLabel;
  comedy: RatingLabel;
  thrill: RatingLabel;
};

type RatingLabel = {
  name: string;
  shortName?: string;
};
