import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import axios from "axios";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/provider";
import { CommonLayout } from "../components/templates/CommonLayout";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

type DramaData = {
  drama: Drama;
  reviews: any;
  avg: any;
};

type Drama = {
  title: string;
  permalink: string;
  kana: string;
  _startAt: string;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    throw Error;
  }
  const coreUrl = process.env.CORE_URL;
  if (!coreUrl) {
    throw Error;
  }
  const { drama_permalink: permalink } = params;
  const { data: dramaData } = await axios.get<DramaData>(
    `${coreUrl}/drama/${permalink}`
  );
  return { props: { dramaData } };
};

const Drama = (props: { dramaData: DramaData }) => {
  const { drama, reviews, avg } = props.dramaData;
  const { title, kana } = drama;
  return (
    <ChakraProvider theme={theme}>
      <CommonLayout>
        <div>
          <Head>
            <title>{title}</title>
          </Head>
          <h1>{title}</h1>
          <Link href="/drama/cast">キャスト</Link>
        </div>
      </CommonLayout>
    </ChakraProvider>
  );
};
export default Drama;
