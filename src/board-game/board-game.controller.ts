import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerTag } from 'libs/constants';
import { BoardGameService } from './board-game.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';

@ApiTags(SwaggerTag.BoardGame)
@ApiBearerAuth()
@Controller('board-game')
export class BoardGameController {
  constructor(private readonly boardGameService: BoardGameService) {}

  @Post()
  async create(@Body() createBoardGameDto: CreateBoardGameDto) {
    return await this.boardGameService.create(createBoardGameDto);
  }

  @Get('/list')
  async findAll() {
    return await this.boardGameService.findAll();
  }

  @Get('/list/:genreId')
  async findAllByGenre(@Param('genreId') genreId: string) {
    return await this.boardGameService.findAllByGenreId(+genreId);
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
