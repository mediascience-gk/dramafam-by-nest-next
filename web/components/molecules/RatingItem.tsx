import { FC, memo } from 'react';
import { Text } from '@mantine/core';

import { RatingSlider } from '../atoms/slider/RatingSlider';

type Props = {
  label: string;
  inputProps: { value: number; onChange: (e: any) => void };
};

export const RatingItem: FC<Props> = memo((props) => {
  const { label, inputProps } = props;
  return (
    <>
      <Text>{label}</Text>
      <RatingSlider label={label} inputProps={inputProps} />
    </>
  );
});
