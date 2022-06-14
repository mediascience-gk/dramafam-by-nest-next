import { FC } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';

import { CommonLayout } from '../components/templates/CommonLayout';
import { DramaRating } from '../components/organisms/drama/DramaRating';
import { ReviewList } from '../components/organisms/drama/review/ReviewList';
import { Drama } from '../types/drama';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    throw Error;
  }
  const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;
  if (!coreUrl) {
    throw Error;
  }
  const { drama_permalink: permalink } = params;
  const { data: drama } = await axios.get<Drama>(
    `${coreUrl}/drama/${permalink}`
  );
  return { props: { drama } };
};

type Props = {
  drama: Drama;
};

const DramaDetail: FC<Props> = (props) => {
  const { id, title, rating, ratingLabels, reviews } = props.drama;

  return (
    <CommonLayout title={title}>
      <h1>{title}</h1>
      <DramaRating rating={rating} ratingLabels={ratingLabels} />
      <ReviewList dramaId={id} reviews={reviews} ratingLabels={ratingLabels} />
    </CommonLayout>
  );
};
export default DramaDetail;
