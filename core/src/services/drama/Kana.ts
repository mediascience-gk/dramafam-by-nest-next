export class Kana {
  private readonly kana: string;

  constructor(str: string) {
    if (!(str.match(/^[ぁ-んー]*$/) || str.match(/^[ァ-ヶー]+$/))) {
      throw new Error('ひらがな、またはカタカナでご入力ください');
    }

    this.kana = str;
  }

  toString() {
    return this.kana;
  }
}
