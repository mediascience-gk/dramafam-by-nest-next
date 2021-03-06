import { convertKanaToKanaStatus } from './convert-kana-to-kana-status';

describe('convertKanaToKanaStatus', () => {
  it('カタカナの変換', () => {
    const kanaStatus = convertKanaToKanaStatus('タチツテト');
    expect(kanaStatus).toBe('たちつてと');
  });

  it('濁点を含む変換', () => {
    const kanaStatus =
      convertKanaToKanaStatus('だだだぢぢぢづづづでででどどど');
    expect(kanaStatus).toBe('たたたちちちつつつてててととと');
  });

  it('小文字を含む変換', () => {
    const kanaStatus =
      convertKanaToKanaStatus('ぁぁぁぃぃぃぅぅぅぇぇぇぉぉぉ');
    expect(kanaStatus).toBe('あああいいいうううえええおおお');
  });

  it('ーを含む変換', () => {
    const kanaStatus = convertKanaToKanaStatus('スノーボード');
    expect(kanaStatus).toBe('すのーほーと');
  });
});
