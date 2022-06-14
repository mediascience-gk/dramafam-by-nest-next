import { FC, memo } from 'react';
import { Card, Grid } from '@mantine/core';

import { RatingRadarChart } from '../../atoms/chart/RatingRadarChart';
import { RatingTable } from '../../atoms/table/RatingTable';
import { Rating, RatingLabels } from '../../../types/drama';

type Props = {
  rating: Rating;
  ratingLabels: RatingLabels;
};

export const DramaRating: FC<Props> = memo((props) => {
  const { rating, ratingLabels } = props;
  return (
    <Card mb={20}>
      <Grid>
        <Grid.Col xs={6}>
          <Grid justify="center">
            <Grid.Col xl={8} lg={8} md={10} sm={12} xs={11} span={12}>
              <RatingRadarChart
                rating={rating}
                ratingLabels={ratingLabels}
                shortNameFlag={true}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col xs={6}>
          <RatingTable rating={rating} ratingLabels={ratingLabels} />
        </Grid.Col>
      </Grid>
    </Card>
  );
});
