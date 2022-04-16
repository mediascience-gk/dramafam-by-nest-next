export class ConvertKanaToKanaStatus {
  private kana;

  constructor(kana: string) {
    this.kana = kana;
  }

  convert = function () {
    let kana = this.kanaToHira(this.kana);
    this.kanaDic.forEach(function (element: [string, string]) {
      kana = kana.split(element[0]).join(element[1]);
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
    ['が', 'か'],
    ['ぎ', 'き'],
    ['ぐ', 'く'],
    ['げ', 'け'],
    ['ご', 'こ'],
    ['ざ', 'さ'],
    ['じ', 'さ'],
    ['ず', 'す'],
    ['ぜ', 'せ'],
    ['ぞ', 'そ'],
    ['だ', 'た'],
    ['ぢ', 'ち'],
    ['づ', 'つ'],
    ['で', 'て'],
    ['ど', 'と'],
    ['ば', 'は'],
    ['び', 'ひ'],
    ['ぶ', 'ふ'],
    ['べ', 'へ'],
    ['ぼ', 'ほ'],
  ];
}
