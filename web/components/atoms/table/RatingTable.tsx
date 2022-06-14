import { FC, memo } from 'react';
import { Table } from '@mantine/core';
import { Rating, RatingLabels } from '../../../types/drama';

type Props = {
  rating: Rating;
  ratingLabels: RatingLabels;
  shortNameFlag?: boolean;
  smallFlag?: boolean;
};

export const RatingTable: FC<Props> = memo((props) => {
  const {
    rating,
    ratingLabels,
    shortNameFlag = false,
    smallFlag = false,
  } = props;
  const fontSize = smallFlag ? 'xs' : 'md';
  const horizontalSpacing = smallFlag ? 4 : 'xs';
  const verticalSpacing = smallFlag ? 4 : 'xs';
  return (
    <Table
      horizontalSpacing={horizontalSpacing}
      verticalSpacing={verticalSpacing}
      fontSize={fontSize}
    >
      <tbody>
        <tr key={ratingLabels.story.name}>
          <td>{ratingLabels.story.name}</td>
          <td className="text-right">{rating.story.score || ' - '} 点</td>
        </tr>
        <tr key={ratingLabels.cast.name}>
          <td>{ratingLabels.cast.name}</td>
          <td className="text-right">{rating.cast.score || ' - '} 点</td>
        </tr>
        <tr key={ratingLabels.impression.name}>
          <td>{ratingLabels.impression.name}</td>
          <td className="text-right">{rating.impression.score || ' - '} 点</td>
        </tr>
        <tr key={ratingLabels.thrill.name}>
          <td>
            {shortNameFlag
              ? ratingLabels.thrill.shortName
              : ratingLabels.thrill.name}
          </td>
          <td className="text-right">{rating.thrill.score || ' - '} 点</td>
        </tr>
        <tr key={ratingLabels.comedy.name}>
          <td>{ratingLabels.comedy.name}</td>
          <td className="text-right">{rating.comedy.score || ' - '} 点</td>
        </tr>
        <tr key={ratingLabels.production.name}>
          <td>{ratingLabels.production.name}</td>
          <td className="text-right">{rating.production.score || ' - '} 点</td>
        </tr>
        <tr key={ratingLabels.music.name}>
          <td>{ratingLabels.music.name}</td>
          <td className="text-right">{rating.music.score || ' - '} 点</td>
        </tr>
      </tbody>
    </Table>
  );
});
