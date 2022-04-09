import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryModel } from '../entities/entry.model';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  async create(@Body() createEntryDto: CreateEntryDto): Promise<EntryModel> {
    return await this.entryService.create(createEntryDto);
  }

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
