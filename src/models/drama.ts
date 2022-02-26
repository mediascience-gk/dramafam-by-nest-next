export class Drama {
  private dramaName: string;
  private season: string;
  private permaLink: string;
  private pronounce: string;
  private tvCompany: string;
  private startAt: string;
  private endAt: string;

  constructor(props: {
    dramaName: string;
    season: string;
    permaLink: string;
    pronounce: string;
    tvCompany: string;
    startAt: string;
    endAt: string;
  }) {
    this.validateProps(props);

    this.dramaName = props.dramaName;
    this.season = props.season;
    this.permaLink = props.permaLink;
    this.pronounce = props.pronounce;
    this.tvCompany = props.tvCompany;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }

  save() {}

  private validateProps(props: {
    dramaName: string;
    season: string;
    permaLink: string;
    pronounce: string;
    tvCompany: string;
    startAt: string;
    endAt: string;
  }): void {
    if (props.dramaName === null) {
      throw new Error('null dramaName');
    } else if (props.dramaName?.length < 1) {
      throw new Error('zero-length dramaName');
    }
  }
}
