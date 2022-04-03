import { Controller, Get, Param } from '@nestjs/common';
import { EntryService } from '../services/entry.service';
import { CommentService } from '../services/comment.service';
import { CommentModel } from '../orm/comment.model';
import { EntryModel } from '../orm/entry.model';

@Controller('entry')
export class EntryController {
  constructor(
    private readonly entryService: EntryService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  index(): Promise<EntryModel[]> {
    return this.entryService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<EntryModel | undefined> {
    return this.entryService.findOne(id);
    /**
     * const entry = await this.entryService.findOne(id);
     * const comments = await this.commentService.findAll();
     * const contents = {
     *   entry: entry,
     *   comments: comments,
     * };
     * console.log(entry, comments);
     * return this.commentService.findAll();
     */
  }
}
