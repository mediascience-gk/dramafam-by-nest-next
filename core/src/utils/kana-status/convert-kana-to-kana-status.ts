export const convertKanaToKanaStatus = function (kana: string): string {
  let kanaStatus = kanaToKanaStatus(kana);
  kanaDic.forEach(function (element: [string, string]) {
    kanaStatus = kanaStatus.split(element[0]).join(element[1]);
  });

  if (!isKanaStatus(kanaStatus)) {
    throw Error('kanaStatusの変換に失敗しました');
  }

  return kanaStatus;
};

const isKanaStatus = function (kanaStatus: string): boolean {
  if (kanaStatus) {
    const arr = kanaStatus.split('');
    let count = 0;
    arr.forEach((s: string) => {
      if (!kanaStatusList.includes(s)) {
        count++;
      }
    });
    if (count) {
      return false;
    }
    return true;
  }

  return false;
};

const kanaToKanaStatus = (str: string) => {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
};

const kanaDic = [
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

const kanaStatusList = [
  'あ',
  'い',
  'う',
  'え',
  'お',
  'か',
  'き',
  'く',
  'け',
  'こ',
  'さ',
  'し',
  'す',
  'せ',
  'そ',
  'た',
  'ち',
  'つ',
  'て',
  'と',
  'な',
  'に',
  'ぬ',
  'ね',
  'の',
  'は',
  'ひ',
  'ふ',
  'へ',
  'ほ',
  'ま',
  'み',
  'む',
  'め',
  'も',
  'や',
  'ゆ',
  'ら',
  'り',
  'る',
  'れ',
  'ろ',
  'よ',
  'ん',
];
