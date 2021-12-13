import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AdminBoardGameService } from './admin-board-game.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { Role } from 'src/auth/entities/role';
import { Roles } from 'libs/decorators/role.decorator';
import { RoleGuard } from 'libs/guards/role.guard';
import { SwaggerTag } from 'libs/constants';
import { ApiPostAdminBoardGameReqBody } from './schemas/api-post-admin-board-game-req-body.schema';
import { ApiUnauthorizedResponse } from 'libs/decorators/api-unauthorized-response.decorator';
import { ApiExpiredTokenResponse } from 'libs/decorators/api-expired-token-response.decorator';
import { ApiForbiddenResponse } from 'libs/decorators/api-forbidden-response.decorator';
import { ApiPostAdminBoardGameResData } from './schemas/api-post-admin-board-game-res-data.schema';
import { ApiPatchAdminBoardGameIdResData } from './schemas/api-patch-admin-board-game-id-res-data.schema';
import { ApiPatchAdminBoardGameIdReqBody } from './schemas/api-patch-admin-board-game-id-req-body.schema';
import { ApiDeleteAdminBoardGameIdResData } from './schemas/api-delete-admin-board-game-id-res-data.schema';
import { ApiGetAdminBoardGameListResData } from './schemas/api-get-admin-board-game-list-res-data.schema';
import { ErrorCode } from 'libs/http-exceptions/error-codes';

@ApiTags(SwaggerTag.AdminBoardGame)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN)
@ApiUnauthorizedResponse()
@ApiExpiredTokenResponse()
@ApiForbiddenResponse(ErrorCode.NoPermission)
@Controller('admin/board-game')
export class AdminBoardGameController {
  constructor(private readonly adminBoardGameService: AdminBoardGameService) {}

  @Post()
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiPostAdminBoardGameResData) },
  })
  async create(
    @Body() body: ApiPostAdminBoardGameReqBody,
  ): Promise<ApiPostAdminBoardGameResData> {
    const boardGame = await this.adminBoardGameService.create(body.boardGame);
    return { boardGame };
  }

  @Get('list')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiGetAdminBoardGameListResData) },
  })
  async getBoardGameList(
    @Query('rowsPerPage', ParseIntPipe) rowsPerPage: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('keyword') keyword: string,
  ) {
    const boardGames = await this.adminBoardGameService.findAll(
      rowsPerPage,
      page,
      keyword,
    );
    const totalCount = await this.adminBoardGameService.getAllCount(keyword);
    return { boardGames, totalCount };
  }

  @Patch(':id')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiPatchAdminBoardGameIdResData) },
  })
  @ApiNotFoundResponse(
    AdminBoardGameService.ErrorNotFoundBoardGame.toApiResponseOptions(),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ApiPatchAdminBoardGameIdReqBody,
  ): Promise<ApiPatchAdminBoardGameIdResData> {
    const boardGame = await this.adminBoardGameService.update(
      id,
      body.boardGame,
    );
    return { boardGame };
  }

  @Delete(':id')
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiDeleteAdminBoardGameIdResData) },
  })
  @ApiNotFoundResponse(
    AdminBoardGameService.ErrorNotFoundBoardGame.toApiResponseOptions(),
  )
  async remove(@Param('id', ParseIntPipe) id: number) {
    const boardGame = await this.adminBoardGameService.remove(+id);
    return { boardGame };
  }
}
