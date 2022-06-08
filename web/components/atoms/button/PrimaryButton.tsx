import { FC, memo, ReactNode } from 'react';
import { Button } from '@mantine/core';

type Props = {
  children: ReactNode;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const {
    children,
    type = 'button',
    disabled = false,
    loading = false,
    onClick,
  } = props;
  return (
    <Button
      color="pink"
      type={type}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
