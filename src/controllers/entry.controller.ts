import { Controller, Get, Param } from '@nestjs/common';
import { EntryService } from '../services/entry.service';
import { CommentService } from '../services/comment.service';

@Controller()
export class EntryController {
  constructor(
    private readonly entryService: EntryService,
    private readonly commentService: CommentService, // ここをコメントアウトするとエラーが出ます
  ) {}

  @Get()
  index() {
    return this.entryService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    const entry = await this.entryService.findOne(id);
    const comments = await this.commentService.findAll();
    const contents = {
      entry: entry,
      comments: comments,
    };
    return contents;
  }
}
