export class Drama {
  private name: string;
  private season: string;
  private permalink: string;
  private kana: string;
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
  }

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
  }
}
