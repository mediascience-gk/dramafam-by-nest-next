import { DeleteDrama } from './deleteDrama';

test('管理者がドラマを削除', () => {
  const deleteDrama = new DeleteDrama({
    id: 1,
  });

  expect(() => deleteDrama.delete()).not.toThrowError();
});
