import { useRouter } from 'next/router';
import { CommonLayout } from '../templates/CommonLayout';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { Button, Center, TextInput } from '@mantine/core';

const schema = Yup.object().shape({
  comment: Yup.string().required('コメントを入力してください'),
});

export const ReviewCreate = () => {
  const router = useRouter();

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      comment: '',
    },
  });

  const handleSubmit = async () => {
    await router.push(`?confirm=1`);
  };

  return (
    <CommonLayout title="レビュー投稿">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mb="md"
          label="コメント"
          placeholder="コメントを入力..."
          {...form.getInputProps('comment')}
        />
        <Center>
          <Button mb="xl" type="submit" color="pink">
            入力内容を確認
          </Button>
        </Center>
      </form>
    </CommonLayout>
  );
};
