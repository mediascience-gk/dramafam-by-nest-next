import { FC, HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import { BaseButton } from './BaseButton';

type Props = {
  children: ReactNode;
  href: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

export const PrimaryButtonLink: FC<Props> = memo((props) => {
  const { children, href, target } = props;
  return (
    <BaseButton color="pink" target={target} href={href}>
      {children}
    </BaseButton>
  );
});
