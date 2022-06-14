import { FC, memo, ReactNode } from 'react';
import { BaseButton } from './BaseButton';

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
    <BaseButton
      color="pink"
      type={type}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
});
