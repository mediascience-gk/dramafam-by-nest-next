import { FC, ReactNode } from 'react';
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
    <div className="flex min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className="flex flex-1 flex-col p-4">{children}</main>
      <footer></footer>
    </div>
  );
};
