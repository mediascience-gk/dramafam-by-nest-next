import { ConvertKanaToKanaStatus } from './convertKanaToKanaStatus';

export class Drama {
  private name: string;
  private season: string;
  private permalink: string;
  private kana: string;
  private kanaStatus: string;
  private tvCompany: string;
  private startAt: string;
  private endAt: string;

  constructor(props: {
    name: string;
    season: string;
    permalink: string;
    kana: string;
    tvCompany: string;
    startAt: string;
    endAt: string;
  }) {
    this.validateProps(props);

    this.name = props.name;
    this.season = props.season;
    this.permalink = props.permalink;
    this.kana = props.kana;
    this.tvCompany = props.tvCompany;
    this.startAt = props.startAt;
    this.endAt = props.endAt;

    const convertKanaToKanaStatus = new ConvertKanaToKanaStatus(props.kana);
    this.kanaStatus = convertKanaToKanaStatus.convert();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delete() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  save() {}

  private validateProps(props: {
    name: string;
    season: string;
    permalink: string;
    kana: string;
    tvCompany: string;
    startAt: string;
    endAt: string;
  }): void {
    if (props.name === null) {
      throw new Error('null name');
    } else if (props.name?.length < 1) {
      throw new Error('zero-length name');
    }

    if (props.permalink === null) {
      throw new Error('null permalink');
    } else if (props.permalink?.length < 1) {
      throw new Error('zero-length permalink');
    }

    if (props.kana === null) {
      throw new Error('null kana');
    } else if (props.kana?.length < 1) {
      throw new Error('zero-length kana');
    } else if (!this.isKana(props.kana)) {
      throw new Error('not-kana kana');
    }

    if (props.tvCompany === null) {
      throw new Error('null tvCompany');
    } else if (props.tvCompany?.length < 1) {
      throw new Error('zero-length tvCompany');
    }
  }

  isKana = function (kana: string) {
    if (kana.match(/^[ぁ-んー]*$/) || kana.match(/^[ァ-ヶー]+$/)) {
      return true;
    } else {
      return false;
    }
  };
}
