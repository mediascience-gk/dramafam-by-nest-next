import { FC, memo } from 'react';
import { Grid } from '@mantine/core';
import { ReviewDetail } from './ReviewDetail';
import { Review } from '../../../../types/review';
import { PrimaryButtonLink } from '../../../atoms/button/PrimaryButtonLink';
import { RatingLabels } from '../../../../types/drama';

type Props = {
  dramaId: string;
  reviews: Review[];
  ratingLabels: RatingLabels;
};

export const ReviewList: FC<Props> = memo((props) => {
  const { dramaId, reviews, ratingLabels } = props;
  return (
    <>
      <Grid>
        <Grid.Col span={6}>
          <h3 className="mt-2">レビュー一覧</h3>
        </Grid.Col>
        <Grid.Col span={6} className="text-right">
          <PrimaryButtonLink href={`/${dramaId}/review/create`}>
            レビューの投稿
          </PrimaryButtonLink>
        </Grid.Col>
      </Grid>
      {reviews.map((review) => (
        <ReviewDetail
          key={review.id}
          review={review}
          ratingLabels={ratingLabels}
        />
      ))}
    </>
  );
});
