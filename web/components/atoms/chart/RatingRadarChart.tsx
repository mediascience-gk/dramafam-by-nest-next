import { FC, memo } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
import { Rating, RatingLabels } from '../../../types/drama';

type Props = {
  rating: Rating;
  ratingLabels: RatingLabels;
  shortNameFlag?: boolean;
};

export const RatingRadarChart: FC<Props> = memo((props) => {
  const { rating, ratingLabels, shortNameFlag = false } = props;
  const data = {
    labels: [
      shortNameFlag && ratingLabels.story.shortName
        ? ratingLabels.story.shortName
        : ratingLabels.story.name,
      shortNameFlag && ratingLabels.cast.shortName
        ? ratingLabels.cast.shortName
        : ratingLabels.cast.name,
      shortNameFlag && ratingLabels.impression.shortName
        ? ratingLabels.impression.shortName
        : ratingLabels.impression.name,
      shortNameFlag && ratingLabels.thrill.shortName
        ? ratingLabels.thrill.shortName
        : ratingLabels.thrill.name,
      shortNameFlag && ratingLabels.comedy.shortName
        ? ratingLabels.comedy.shortName
        : ratingLabels.comedy.name,
      shortNameFlag && ratingLabels.production.shortName
        ? ratingLabels.production.shortName
        : ratingLabels.production.name,
      shortNameFlag && ratingLabels.music.shortName
        ? ratingLabels.music.shortName
        : ratingLabels.music.name,
    ],
    datasets: [
      {
        label: 'My First Dataset',
        data: [
          rating.story.score,
          rating.cast.score,
          rating.impression.score,
          rating.thrill.score,
          rating.comedy.score,
          rating.production.score,
          rating.music.score,
        ],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  const options = {
    legend: {
      display: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        ticks: {
          stepSize: 1,
        },
        min: 0,
        max: 5,
      },
    },
  };
  return <Radar data={data} options={options} />;
});
