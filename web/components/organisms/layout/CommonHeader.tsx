import React, { FC, ReactNode, useState } from 'react';
import {
  Drawer,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Anchor,
} from '@mantine/core';

type Props = {
  children: ReactNode;
};

export const CommonHeader: FC<Props> = (props) => {
  const { children } = props;
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={false}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
                sx={(theme) => ({
                  '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                  },
                })}
              />
            </MediaQuery>

            <Anchor className="text-gray-600" href="/">
              ドラマふぁむ
            </Anchor>
          </div>
        </Header>
      }
    >
      {children}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={<div className="text-gray-400 text-sm">Menu</div>}
        padding="xl"
        size="lg"
      >
        Application drawer
      </Drawer>
    </AppShell>
  );
};
