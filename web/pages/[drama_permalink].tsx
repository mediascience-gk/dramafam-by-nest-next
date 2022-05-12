import Head from "next/head";
import Link from "next/link";

const Drama = () => {
  return (
    <>
      <div>
        <Head>
          <title>なんでやねん！</title>
        </Head>
        <h1>なんでやねん！</h1>
        <Link href="/drama/cast">キャスト</Link>
      </div>
    </>
  );
};
export default Drama;
