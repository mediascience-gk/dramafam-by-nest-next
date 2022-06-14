import { Review } from '../review/review';
import { Rating } from './rating';

export interface DramaPresentation {
  id: number;
  title: string;
  permalink: string;
}

export class Drama {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly permalink: string,
    public readonly kana: string,
    private readonly _startAt: Date,
    private readonly _endAt?: Date,
  ) {}

  public readonly ratingLabels = {
    general: {
      name: '総合評価',
    },
    cast: {
      name: 'キャスト',
    },
    story: {
      name: '脚本',
    },
    production: {
      name: '映像',
    },
    impression: {
      name: '感動',
    },
    music: {
      name: '音楽',
    },
    comedy: {
      name: '笑い',
    },
    thrill: {
      name: 'スリル・興奮',
      shortName: 'スリル',
    },
  };
  public rating: Rating;
  public reviews: Review[];

  get startAt(): string {
    return this._startAt.toString();
  }

  get endAt(): string | undefined {
    if (!this._endAt) return;

    return this._endAt.toString();
  }
}
