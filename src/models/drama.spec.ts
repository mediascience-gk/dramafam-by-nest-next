import { Drama } from './drama';

test('管理者が、正規のドラマ情報を送信すると、新規でドラマが追加される', () => {
  const drama = new Drama();
  expect(() => drama.save()).not.toThrowError();
});

xtest('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: ドラマ名が未入力)', () => {
  expect(false).toEqual(true);
});

xtest('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: パーマリンクが未入力)', () => {
  expect(false).toEqual(true);
});

xtest('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: 放送局が未入力)', () => {
  expect(false).toEqual(true);
});

xtest('管理者が、ドラマの放送時期が未定のドラマを送信すると、ドラマは登録できない', () => {
  expect(false).toEqual(true);
});

xtest('管理者が、開始日が未定のドラマを送信すると、ドラマは登録できない', () => {
  expect(false).toEqual(true);
});

xtest('管理者が、重複したドラマ名を登録すると、エラーが返る (リメイク版はSEOの観点からも必ず異なる名前が付く)', () => {
  expect(false).toEqual(true);
});

xtest('管理者は、複数の放送時期を指定したドラマ情報を送信できる', () => {
  expect(false).toEqual(true);
});
