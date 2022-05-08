import { Review } from '../review/review';

export interface DramaPresentation {
  id: number;
  title: string;
  permalink: string;
  kana: string;
  reviews?: Review[];
}

export class Drama {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly permalink: string,
    public readonly kana: string,
    private readonly findAll: (dramaId: number) => Promise<Review[]>,
    private readonly _startAt: Date,
    private readonly _endAt?: Date,
  ) {}

  reviews() {
    return this.findAll(this.id);
  }

  get startAt(): string {
    return this._startAt.toString();
  }

  get endAt(): string | undefined {
    if (!this._endAt) return;

    return this._endAt.toString();
  }
}
