import { FC, HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import { Button } from '@mantine/core';

type Props = {
  children: ReactNode;
  color: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

export const BaseButton: FC<Props> = memo((props) => {
  const {
    children,
    color,
    type = 'button',
    disabled = false,
    loading = false,
    onClick,
    href,
    target,
  } = props;
  return (
    <>
      {href ? (
        <Button color={color} component="a" target={target} href={href}>
          {children}
        </Button>
      ) : (
        <Button
          color={color}
          type={type}
          loading={loading}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </Button>
      )}
    </>
  );
});
