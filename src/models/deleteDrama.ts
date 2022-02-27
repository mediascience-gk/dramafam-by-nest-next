export class DeleteDrama {
  private id: number;

  constructor(props: {
      id: number
    }) {
    this.validateProps(props);

    this.id = props.id;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  delete() {}

  private validateProps(props: {
    id: number;
  }): void {
    if (props.id === null) {
      throw new Error('null id');
    } else if (props.id < 1) {
      throw new Error('zero id');
    }
  }
}
