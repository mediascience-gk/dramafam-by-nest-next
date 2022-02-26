export class Drama {
  private drama_name: string;
  private season: string;
  private permaLink: string;
  private pronounce: string;
  private tvCompany: string;
  private startAt: string;
  private endAt: string;

  constructor(props: {
    drama_name: string;
    season: string;
    permaLink: string;
    pronounce: string;
    tvCompany: string;
    startAt: string;
    endAt: string;
  }) {
    this.validateProps(props);

    this.drama_name = props.drama_name;
    this.season = props.season;
    this.permaLink = props.permaLink;
    this.pronounce = props.pronounce;
    this.tvCompany = props.tvCompany;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }

  save() {}

  private validateProps(props: {
    drama_name: string;
    season: string;
    permaLink: string;
    pronounce: string;
    tvCompany: string;
    startAt: string;
    endAt: string;
  }): void {
    if (props.drama_name === null) {
      throw new Error('null drama_name');
    } else if (props.drama_name?.length < 1) {
      throw new Error('zero-length drama_name');
    }
  }
}
