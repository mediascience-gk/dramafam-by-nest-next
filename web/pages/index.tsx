import type { GetServerSideProps, NextPage } from 'next';
import { CommonLayout } from '../components/templates/CommonLayout';
import axios from 'axios';
import { Drama } from '../types/drama';
import Link from 'next/link';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import {
  Anchor,
  Button,
  Card,
  Center,
  List,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useQueryClient } from 'react-query';
import { CircleCheck } from 'tabler-icons-react';

const url = `${process.env.NEXT_PUBLIC_CORE_URL}/drama`;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: dramas } = await axios.get(url);
  return { props: { dramas } };
};

type CreateDrama = {
  title: string;
  kana: string;
  permalink: string;
  startAt: string;
};

const schema = Yup.object().shape({
  title: Yup.string().required('タイトルを入力してください'),
  kana: Yup.string().required('読み方を入力してください'),
  permalink: Yup.string().required('パーマリンクを入力してください'),
});

const Home = (props: { dramas: Drama[] }) => {
  const { dramas } = props;

  const form = useForm<CreateDrama>({
    schema: yupResolver(schema),
    initialValues: {
      title: '',
      kana: '',
      permalink: '',
      startAt: '',
    },
  });

  const handleSubmit = async () => {
    const drama = await axios
      .post(url, {
        title: form.values.title,
        kana: form.values.kana,
        permalink: form.values.permalink,
        startAt: form.values.startAt,
      })
      .then((res) => console.log(res.data));
    form.reset();
  };

  return (
    <CommonLayout title="ドラマふぁむ">
      <h1>ドラマふぁむ</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mb="md"
          label="ドラマ名"
          placeholder="ドラマ名を入力..."
          {...form.getInputProps('title')}
        />
        <TextInput
          mb="md"
          label="読み方"
          placeholder="読み方を入力..."
          {...form.getInputProps('kana')}
        />
        <TextInput
          mb="md"
          label="パーマリンク"
          placeholder="パーマリンクを入力..."
          {...form.getInputProps('permalink')}
        />
        <TextInput
          mb="md"
          label="開始日"
          placeholder="開始日を入力..."
          {...form.getInputProps('startAt')}
        />
        <Center>
          <Button mb="xl" type="submit" color="pink">
            ドラマを追加
          </Button>
        </Center>
      </form>
      <h2 className="mt-0 text-gray-700">ドラマ一覧</h2>
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="pink" size={20} radius="xl">
            <CircleCheck size={14} />
          </ThemeIcon>
        }
      >
        {dramas &&
          dramas.map((drama) => (
            <List.Item key={drama.id}>
              <Anchor href={`/${drama.id}`} color="cyan">
                {drama.title}
              </Anchor>
            </List.Item>
          ))}
      </List>
    </CommonLayout>
  );
};

export default Home;
