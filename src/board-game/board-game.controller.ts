import { Controller, Param, Get, UseGuards, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SwaggerTag } from 'src/libs/constants';
import { RoleGuard } from 'src/libs/guards/role.guard';
import { UserByAccessToken } from 'src/libs/strategies/jwt.strategy';
import { BoardGameService } from './board-game.service';
import { ApiGetBoardGameListGenreIdResData } from './schemas/api-get-board-game-list-genre-id-res-data.schema';
import { ApiGetBoardGameListResData } from './schemas/api-get-board-game-list-res-data.schema';
import { Request } from 'express';
import { ApiGetBoardGameIdResData } from './schemas/api-get-board-game-id-res-data.schema';

@ApiTags(SwaggerTag.BoardGame)
@Controller('board-game')
export class BoardGameController {
  constructor(private readonly boardGameService: BoardGameService) {}

  @Get('list')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiGetBoardGameListResData) },
  })
  async findAll(): Promise<ApiGetBoardGameListResData> {
    const boardGames = await this.boardGameService.findAll();
    return { boardGames };
  }

  @Get('list/:genreId')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiGetBoardGameListGenreIdResData) },
  })
  @ApiBadRequestResponse(
    BoardGameService.ErrorBadRequestGenreId.toApiResponseOptions(),
  )
  async findAllByGenreId(
    @Param('genreId') genreId: string,
  ): Promise<ApiGetBoardGameListGenreIdResData> {
    const boardGames = await this.boardGameService.findAllByGenreId(+genreId);
    return { boardGames };
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiGetBoardGameIdResData) },
  })
  @ApiNotFoundResponse(
    BoardGameService.ErrorNotFoundBoardGame.toApiResponseOptions(),
  )
  async findOneById(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ApiGetBoardGameIdResData> {
    const userId = (req.user as UserByAccessToken)?.id;
    const boardGame = await this.boardGameService.findOneById(+id, userId);
    return { boardGame };
  }
}
