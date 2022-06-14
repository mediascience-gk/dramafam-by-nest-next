import { Rating } from './drama';

export type Review = {
  id: string;
  commentator: string;
  age: '10代' | '10代' | '30代' | '40代' | '50代' | '60代' | '70代';
  body: string;
  rating: Rating;
};
