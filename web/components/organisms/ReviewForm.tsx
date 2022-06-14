import { FC } from 'react';
import { Center, Textarea, TextInput } from '@mantine/core';
import { RatingItem } from '../molecules/drama/RatingItem';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { PrimaryButton } from '../atoms/button/PrimaryButton';

type Props = {
  form: UseFormReturnType<{
    body: string;
    commentator: string;
    age: string;
    gender: string;
    ratingOfGeneral: number;
    ratingOfCast: number;
    ratingOfStory: number;
    ratingOfProduction: number;
    ratingOfImpression: number;
    ratingOfMusic: number;
    ratingOfComedy: number;
    ratingOfThrill: number;
    dramaId: string;
  }>;
  handleSubmit: () => Promise<void>;
};

export const ReviewForm: FC<Props> = (props) => {
  const { form, handleSubmit } = props;
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        mb="md"
        label="投稿者名"
        placeholder="投稿者名を入力..."
        {...form.getInputProps('commentator')}
      />
      <Textarea
        mb="md"
        label="コメント"
        placeholder="コメントを入力..."
        {...form.getInputProps('body')}
      />
      <RatingItem
        label="総合評価"
        inputProps={{ ...form.getInputProps('ratingOfGeneral') }}
      />
      <RatingItem
        label="脚本・ストーリー"
        inputProps={{ ...form.getInputProps('ratingOfStory') }}
      />
      <RatingItem
        label="キャスト"
        inputProps={{ ...form.getInputProps('ratingOfCast') }}
      />
      <RatingItem
        label="映像"
        inputProps={{ ...form.getInputProps('ratingOfProduction') }}
      />
      <RatingItem
        label="音楽"
        inputProps={{ ...form.getInputProps('ratingOfMusic') }}
      />
      <RatingItem
        label="感動"
        inputProps={{ ...form.getInputProps('ratingOfImpression') }}
      />
      <RatingItem
        label="笑い"
        inputProps={{ ...form.getInputProps('ratingOfComedy') }}
      />
      <RatingItem
        label="スリル・興奮"
        inputProps={{ ...form.getInputProps('ratingOfThrill') }}
      />
      <Center>
        <PrimaryButton type="submit">コメント投稿</PrimaryButton>
      </Center>
    </form>
  );
};
