import { FC, ReactNode } from 'react';
import { MediaQuery, MantineProvider, Container, Grid } from '@mantine/core';
import Head from 'next/head';

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
      <Container size="xl" p={20}>
        <Grid gutter="xs">
          <Grid.Col md={8} lg={9}>
            {children}
          </Grid.Col>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Grid.Col md={4} lg={3} className="bg-slate-100">
              サイドバー
            </Grid.Col>
          </MediaQuery>
        </Grid>
      </Container>
    </MantineProvider>
  );
};
