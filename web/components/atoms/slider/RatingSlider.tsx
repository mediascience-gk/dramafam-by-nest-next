import { FC, memo, ReactNode } from 'react';
import { Slider } from '@mantine/core';

type Props = {
  label: string;
  inputProps: { value: number; onChange: (e: any) => void };
};

export const RatingSlider: FC<Props> = memo((props) => {
  const { label, inputProps } = props;
  return (
    <Slider
      label={label}
      className={'mt-2 mb-10 w-96'}
      color="pink"
      min={0}
      max={5}
      step={1}
      marks={[
        { value: 0, label: '不明' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
      ]}
      {...inputProps}
    />
  );
});
