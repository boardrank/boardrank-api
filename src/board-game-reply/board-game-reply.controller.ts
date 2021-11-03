import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardGameReplyService } from './board-game-reply.service';
import { CreateBoardGameReplyDto } from './dto/create-board-game-reply.dto';
import { UpdateBoardGameReplyDto } from './dto/update-board-game-reply.dto';

@Controller('board-game-reply')
export class BoardGameReplyController {
  constructor(private readonly boardGameReplyService: BoardGameReplyService) {}

  @Post()
  create(@Body() createBoardGameReplyDto: CreateBoardGameReplyDto) {
    return this.boardGameReplyService.create(createBoardGameReplyDto);
  }

  @Get()
  findAll() {
    return this.boardGameReplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardGameReplyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardGameReplyDto: UpdateBoardGameReplyDto,
  ) {
    return this.boardGameReplyService.update(+id, updateBoardGameReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardGameReplyService.remove(+id);
  }
}
