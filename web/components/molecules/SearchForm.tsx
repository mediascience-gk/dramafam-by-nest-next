import { FC } from 'react';
import { Button, Input } from '@mantine/core';
import { Search } from 'tabler-icons-react';

export const SearchForm: FC = () => {
  return (
    <>
      <div className="flex">
        <Input />
        <Button
          color="pink"
          style={{
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            marginLeft: '-4px',
          }}
        >
          <Search size="22px" />
        </Button>
      </div>
    </>
  );
};
