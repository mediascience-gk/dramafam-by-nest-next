import { CommentService } from '../../services/comment.service';

export class Drama {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly permalink: string,
    public readonly kana: string,
    private readonly _startAt: Date,
    private readonly _endAt?: Date,
  ) {}

  // async comments(): Promise<Comment[]> {
  //   return await commentService.findAllByDramaId(this.id);
  // }

  get startAt(): string {
    return this._startAt.toString();
  }

  get endAt(): string | undefined {
    if (!this._endAt) return;

    return this._endAt.toString();
  }
}
