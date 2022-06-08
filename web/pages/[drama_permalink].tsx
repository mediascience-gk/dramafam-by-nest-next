import { GetServerSideProps } from 'next';
import axios from 'axios';
import { CommonLayout } from '../components/templates/CommonLayout';
import { Anchor, Table } from '@mantine/core';

type Drama = {
  id: string;
  title: string;
  permalink: string;
  kana: string;
  _startAt: string;
};

type Review = {
  id: string;
  commentator: string;
  age: '10代' | '10代' | '30代' | '40代' | '50代' | '60代' | '70代';
  body: string;
  ratingOfGeneral?: number;
  ratingOfStory?: number;
  ratingOfCast?: number;
  ratingOfProduction?: number;
  ratingOfMusic?: number;
  ratingOfImpression?: number;
  ratingOfComedy?: number;
  ratingOfThrill?: number;
};

type DramaData = {
  drama: Drama;
  reviews: Review[];
  avg: {
    general: AvgItem;
    story: AvgItem;
    cast: AvgItem;
    production: AvgItem;
    music: AvgItem;
    impression: AvgItem;
    comedy: AvgItem;
    thrill: AvgItem;
  };
};

type AvgItem = {
  name: string;
  avg: number | null;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    throw Error;
  }
  const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;
  if (!coreUrl) {
    throw Error;
  }
  const { drama_permalink: permalink } = params;
  const { data: dramaData } = await axios.get<DramaData>(
    `${coreUrl}/drama/${permalink}`
  );
  console.log(dramaData);
  return { props: { dramaData } };
};

const DramaDetail = (props: { dramaData: DramaData }) => {
  const { drama, reviews, avg } = props.dramaData;
  const { title, kana } = drama;
  return (
    <CommonLayout title={title}>
      <h1>{title}</h1>
      <Table horizontalSpacing="xs" verticalSpacing="xs">
        <tbody>
          <tr key={avg.general.name}>
            <td>{avg.general.name}</td>
            <td className="text-right">{avg.general.avg || ' - '} 点</td>
          </tr>
          <tr key={avg.story.name}>
            <td>{avg.story.name}</td>
            <td className="text-right">{avg.story.avg || ' - '} 点</td>
          </tr>
          <tr key={avg.cast.name}>
            <td>{avg.cast.name}</td>
            <td className="text-right">{avg.cast.avg || ' - '} 点</td>
          </tr>
          <tr key={avg.production.name}>
            <td>{avg.production.name}</td>
            <td className="text-right">{avg.production.avg || ' - '} 点</td>
          </tr>
          <tr key={avg.impression.name}>
            <td>{avg.impression.name}</td>
            <td className="text-right">{avg.production.avg || ' - '} 点</td>
          </tr>
        </tbody>
      </Table>
      <h3>レビュー一覧</h3>
      <Anchor href={`/${drama.id}/review/create`}>レビューを投稿する</Anchor>
      {reviews.map((review) => (
        <div
          className="my-4 p-4 border-t-0 border-x-0 border-b-1 border-solid border-slate-200"
          key={review.id}
        >
          <div className="text-sm mb-2 text-gray-600">{review.commentator}</div>
          {review.ratingOfGeneral ? (
            <div className="text-sm">{review.ratingOfGeneral} 点</div>
          ) : (
            ''
          )}
          <div className="py-4">{review.body}</div>
        </div>
      ))}
    </CommonLayout>
  );
};
export default DramaDetail;
