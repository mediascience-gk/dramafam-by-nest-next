import { FC, ReactNode } from 'react';
import { MediaQuery, MantineProvider, Container, Grid } from '@mantine/core';
import Head from 'next/head';
import { CommonHeader } from '../organisms/layout/CommonHeader';

type Props = {
  title: string;
  children: ReactNode;
};

export const CommonLayout: FC<Props> = ({
  children,
  title = 'ドラマふぁむ',
}) => {
  return (
    <MantineProvider>
      <Head>
        <title>{title}</title>
      </Head>
      <CommonHeader>
        <Container size="lg">{children}</Container>
      </CommonHeader>
    </MantineProvider>
  );
};
