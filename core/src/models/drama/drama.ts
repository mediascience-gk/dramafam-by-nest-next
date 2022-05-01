import { Review } from './review';

interface DramaPresentation {
  id: number;
  title: string;
  permalink: string;
  kana: string;
  reviews: { id: string; body: string }[];
}

export class Drama {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly permalink: string,
    public readonly kana: string,
    private readonly fetchReviewsByCount: () => Promise<{ id: string; body: string }[]>,
    private readonly _startAt: Date,
    private readonly _endAt?: Date,
  ) {}

  get startAt(): string {
    return this._startAt.toString();
  }

  get endAt(): string | undefined {
    if (!this._endAt) return;

    return this._endAt.toString();
  }

  get reviewsByDate(): Review[] {
    return this.reviews.sort(() => true);
  }

  isEndThisDrama(): boolean {}

  isCurrentSeasonal(): boolean {}

  isPopular(): boolean {}

  async presentation(): Promise<DramaPresentation> {
    return {
      id: this.id,
      title: this.title,
      permalink: this.permalink,
      kana: this.kana,
      reviews: await Promise.all(
        this.fetchReviewsByCount.map((review) => ({
          id: review.id,
          body: review.body,
        })),
      ),
    };
  }
}
