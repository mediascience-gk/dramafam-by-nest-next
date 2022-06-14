import { CommonLayout } from '../../../components/templates/CommonLayout';
import { useRouter } from 'next/router';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { GetServerSideProps } from 'next';
import axios from 'axios';

import { ReviewForm } from '../../../components/organisms/ReviewForm';
import { useState } from 'react';
import { Slider } from '@mantine/core';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    throw Error;
  }
  const { drama_permalink: permalink } = params;
  const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;
  const { data: drama } = await axios.get(`${coreUrl}/drama/${permalink}`);
  return { props: { drama } };
};

const schema = Yup.object().shape({
  body: Yup.string().required('コメントを入力してください'),
});

const ReviewCreate = (props: any) => {
  const { id, title } = props.drama;
  const router = useRouter();

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      body: '',
      commentator: '',
      age: '',
      gender: '',
      ratingOfGeneral: 0,
      ratingOfCast: 0,
      ratingOfStory: 0,
      ratingOfProduction: 0,
      ratingOfImpression: 0,
      ratingOfMusic: 0,
      ratingOfComedy: 0,
      ratingOfThrill: 0,
      dramaId: id,
    },
  });

  const handleSubmit = async () => {
    const url = `${process.env.NEXT_PUBLIC_CORE_URL}/review`;
    axios
      .post(url, {
        commentator: form.values.commentator,
        age: null,
        gender: null,
        body: form.values.body,
        ratingOfGeneral: form.values.ratingOfGeneral || null,
        ratingOfStory: form.values.ratingOfStory || null,
        ratingOfCast: form.values.ratingOfCast || null,
        ratingOfProduction: form.values.ratingOfProduction || null,
        ratingOfImpression: form.values.ratingOfImpression || null,
        ratingOfMusic: form.values.ratingOfMusic || null,
        ratingOfComedy: form.values.ratingOfComedy || null,
        ratingOfThrill: form.values.ratingOfThrill || null,
        dramaId: id,
      })
      .then((res) => {
        console.log(res);
      });
    form.reset();
    await router.push(`/${id}`);
  };
  return (
    <CommonLayout title="レビュー投稿">
      <h1>『{title}』のレビュー投稿</h1>
      <ReviewForm form={form} handleSubmit={handleSubmit} />
    </CommonLayout>
  );
};

export default ReviewCreate;
