import { Drama } from '../drama/drama';

export class Comment {
  constructor(
    public readonly id: number,
    public readonly body: string,
    public readonly drama: Drama,
  ) {}
}
