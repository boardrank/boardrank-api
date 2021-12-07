import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SwaggerTag } from 'libs/constants';
import { ApiForbiddenResponse } from 'libs/decorators/api-forbidden-response.decorator';
import { ApiUnauthorizedResponse } from 'libs/decorators/api-unauthorized-response.decorator';
import { Roles } from 'libs/decorators/role.decorator';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { RolesGuard } from 'libs/guards/roles.guard';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';
import { Role } from 'src/auth/entities/role';
import { BoardGameService } from './board-game.service';
import { BoardGame } from './entities/board-game.entity';
import { ApiGetBoardGameListGenreIdResData } from './schemas/api-get-board-game-list-genre-id-res-data.schema';
import { ApiGetBoardGameListResData } from './schemas/api-get-board-game-list-res-data.schema';
import { Request } from 'express';
import { ApiGetBoardGameIdResData } from './schemas/api-get-board-game-id-res-data.schema';
import { ApiDeleteBoardGameIdResData } from './schemas/api-delete-board-game-id-res-data.schema';
import { ApiExpiredTokenResponse } from 'libs/decorators/api-expired-token-response.decorator';

@ApiTags(SwaggerTag.BoardGame)
@ApiBearerAuth()
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
  @UseGuards(RolesGuard)
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiDeleteBoardGameIdResData) },
  })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(
    BoardGameService.ErrorNotFoundBoardGame.toApiResponseOptions(),
  )
  async remove(@Param('id') id: string): Promise<ApiDeleteBoardGameIdResData> {
    const boardGame = await this.boardGameService.remove(+id);
    return { boardGame };
  }
}
