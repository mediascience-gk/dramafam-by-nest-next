export class RatingDataItem {
  constructor(
    public readonly name: string,
    public readonly avg: number | null,
    public readonly shortName?: string,
    public readonly rank?: number,
  ) {}
}
