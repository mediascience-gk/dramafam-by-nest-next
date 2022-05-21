import { FC, memo, ReactNode } from "react";
import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export const CommonLayout: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <SimpleGrid minChildWidth="120px" spacing="10px">
      <Box bg="papayawhip" maxWidth="100px" height="80px"></Box>
      <Box bg="tomato" height="80px">
        {children}
      </Box>
    </SimpleGrid>
  );
});
