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
            paddingLeft: '8px',
            paddingRight: '8px',
          }}
        >
          <Search size="20px" />
        </Button>
      </div>
    </>
  );
};
