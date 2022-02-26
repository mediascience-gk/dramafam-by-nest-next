import { Drama } from './drama';

test('管理者が、正規のドラマ情報を送信すると、新規でドラマが追加される', () => {
  const drama = new Drama({
    dramaName: 'ドラマ名',
    season: '放送時期',
    permaLink: 'パーマリンク (URL用文字列)',
    pronounce: '読み方',
    tvCompany: '放送局',
    startAt: '開始日',
    endAt: '終了日 (optional)',
  });

  expect(() => drama.save()).not.toThrowError();
});

test('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: ドラマ名が未入力)', () => {
  expect(
    () =>
      new Drama({
        dramaName: null as any,
        season: '放送時期',
        permaLink: 'パーマリンク (URL用文字列)',
        pronounce: '読み方',
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
});

test('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: ドラマ名がゼロ文字)', () => {
  expect(
    () =>
      new Drama({
        dramaName: '',
        season: '放送時期',
        permaLink: 'パーマリンク (URL用文字列)',
        pronounce: '読み方',
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
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
