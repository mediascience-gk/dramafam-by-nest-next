export class ConvertKanaToKanaStatus {
  private kana;

  constructor(kana: string) {
    this.kana = kana;
  }

  convert = function () {
    const kana = this.kanaToHira(this.kana);
    this.kanaDic.forEach(function (element: [string, string]) {
      kana.replace(element[0], element[1]);
    });
    return kana;
  };

  private kanaToHira(str: string) {
    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  }

  private kanaDic = [
    ['ぁ', 'あ'],
    ['ぃ', 'い'],
    ['ぅ', 'う'],
    ['ぇ', 'え'],
    ['ぉ', 'お'],
    ['っ', 'つ'],
    ['ゃ', 'や'],
    ['ゅ', 'ゆ'],
    ['ょ', 'よ'],
    ['ゎ', 'わ'],
  ];
}
