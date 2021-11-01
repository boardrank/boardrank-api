import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'libs/constants';
import { BoardGameService } from './board-game.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';

@ApiTags(SwaggerTags.BoardGames)
@Controller('board-game')
export class BoardGameController {
  constructor(private readonly boardGameService: BoardGameService) {}

  @Post()
  create(@Body() createBoardGameDto: CreateBoardGameDto) {
    return this.boardGameService.create(createBoardGameDto);
  }

  @Get('/list/:genre')
  findAllByGenre(@Param('genre') genre: string) {
    return this.boardGameService.findAllByGenre(genre);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardGameDto: UpdateBoardGameDto,
  ) {
    return this.boardGameService.update(+id, updateBoardGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardGameService.remove(+id);
  }
}
