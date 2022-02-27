import { Drama } from './drama';

test('管理者が、正規のドラマ情報を送信すると、新規でドラマが追加される', () => {
  const drama = new Drama({
    name: 'ドラマ名',
    season: '放送時期',
    permalink: 'パーマリンク (URL用文字列)',
    kana: 'よみかた',
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
        name: null as any,
        season: '放送時期',
        permalink: 'パーマリンク (URL用文字列)',
        kana: 'よみかた',
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
        name: '',
        season: '放送時期',
        permalink: 'パーマリンク (URL用文字列)',
        kana: 'よみかた',
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
});

test('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: パーマリンクが未入力)', () => {
  expect(
    () =>
      new Drama({
        name: 'ドラマ名',
        season: '放送時期',
        permalink: null as any,
        kana: 'よみかた',
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
});

test('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: permalinkがゼロ文字)', () => {
  expect(
    () =>
      new Drama({
        name: 'ドラマ名',
        season: '放送時期',
        permalink: '',
        kana: 'よみかた',
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
});

test('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: 読み方が未入力)', () => {
  expect(
    () =>
      new Drama({
        name: 'ドラマ名',
        season: '放送時期',
        permalink: 'パーマリンク (URL用文字列)',
        kana: null as any,
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
});

test('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: 読み方がゼロ文字)', () => {
  expect(
    () =>
      new Drama({
        name: 'ドラマ名',
        season: '放送時期',
        permalink: 'パーマリンク (URL用文字列)',
        kana: '',
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
});

test('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: 読み方がひらがなでもカタカナでもない)', () => {
  expect(
    () =>
      new Drama({
        name: 'ドラマ名',
        season: '放送時期',
        permalink: 'パーマリンク (URL用文字列)',
        kana: '読み方',
        tvCompany: '放送局',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
});

xtest('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: 放送局がnull)', () => {
  expect(
    () =>
      new Drama({
        name: 'ドラマ名',
        season: '放送時期',
        permalink: 'パーマリンク (URL用文字列)',
        kana: 'よみかた',
        tvCompany: null as any,
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
});

xtest('管理者が、不正なドラマ情報を送信すると、エラーが返る (ex: 放送局がゼロ文字)', () => {
  expect(
    () =>
      new Drama({
        name: 'ドラマ名',
        season: '放送時期',
        permalink: 'パーマリンク (URL用文字列)',
        kana: 'よみかた',
        tvCompany: '',
        startAt: '開始日',
        endAt: '終了日 (optional)',
      }),
  ).toThrowError();
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
