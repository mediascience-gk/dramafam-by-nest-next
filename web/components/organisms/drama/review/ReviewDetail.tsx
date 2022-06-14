import { FC, memo } from 'react';
import { Review } from '../../../../types/review';
import { MediaQuery, Card, Grid } from '@mantine/core';
import { RatingRadarChart } from '../../../atoms/chart/RatingRadarChart';
import { Rating, RatingLabels } from '../../../../types/drama';
import { RatingTable } from '../../../atoms/table/RatingTable';

type Props = {
  review: Review;
  ratingLabels: RatingLabels;
};

export const ReviewDetail: FC<Props> = memo((props) => {
  const { review, ratingLabels } = props;
  const ratingItemCount = getRatingItemCount(review.rating);
  return (
    <>
      <Card mb={16}>
        <div className="text-sm mb-2 text-gray-600">{review.commentator}</div>
        {review.rating.general.score ? (
          <div className="text-sm">{review.rating.general.score} 点</div>
        ) : (
          ''
        )}
        <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
          <Grid>
            <Grid.Col span={12} className="py-4">
              {review.body}
            </Grid.Col>
            {ratingItemCount > 2 && (
              <Grid.Col span={12}>
                <Grid>
                  <Grid.Col span={7}>
                    <RatingRadarChart
                      rating={review.rating}
                      shortNameFlag={true}
                      ratingLabels={ratingLabels}
                    />
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <RatingTable
                      rating={review.rating}
                      ratingLabels={ratingLabels}
                      shortNameFlag={true}
                      smallFlag={true}
                    />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            )}
          </Grid>
        </MediaQuery>
        <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
          {ratingItemCount > 2 ? (
            <Grid>
              <Grid.Col span={4} xl={3} p={12}>
                <RatingRadarChart
                  rating={review.rating}
                  shortNameFlag={true}
                  ratingLabels={ratingLabels}
                />
              </Grid.Col>
              <Grid.Col span={8} xl={9}>
                <div className="py-4">{review.body}</div>
              </Grid.Col>
            </Grid>
          ) : (
            <Grid>
              <Grid.Col span={12}>
                <div className="py-4">{review.body}</div>
              </Grid.Col>
            </Grid>
          )}
        </MediaQuery>
      </Card>
    </>
  );
});

const getRatingItemCount = (rating: Rating) => {
  let ratingItemCount = 0;
  if (rating.story.score) {
    ratingItemCount = ratingItemCount + 1;
  }
  if (rating.cast.score) {
    ratingItemCount = ratingItemCount + 1;
  }
  if (rating.impression.score) {
    ratingItemCount = ratingItemCount + 1;
  }
  if (rating.thrill.score) {
    ratingItemCount = ratingItemCount + 1;
  }
  if (rating.comedy.score) {
    ratingItemCount = ratingItemCount + 1;
  }
  if (rating.production.score) {
    ratingItemCount = ratingItemCount + 1;
  }
  if (rating.music.score) {
    ratingItemCount = ratingItemCount + 1;
  }
  return ratingItemCount;
};
