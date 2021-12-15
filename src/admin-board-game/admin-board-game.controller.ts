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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AdminBoardGameService } from './admin-board-game.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/libs/guards/jwt-auth.guard';
import { Role } from 'src/auth/entities/role';
import { Roles } from 'src/libs/decorators/role.decorator';
import { RoleGuard } from 'src/libs/guards/role.guard';
import { SwaggerTag } from 'src/libs/constants';
import { ApiPostAdminBoardGameReqBody } from './schemas/api-post-admin-board-game-req-body.schema';
import { ApiUnauthorizedResponse } from 'src/libs/decorators/api-unauthorized-response.decorator';
import { ApiExpiredTokenResponse } from 'src/libs/decorators/api-expired-token-response.decorator';
import { ApiForbiddenResponse } from 'src/libs/decorators/api-forbidden-response.decorator';
import { ApiPostAdminBoardGameResData } from './schemas/api-post-admin-board-game-res-data.schema';
import { ApiPatchAdminBoardGameIdResData } from './schemas/api-patch-admin-board-game-id-res-data.schema';
import { ApiPatchAdminBoardGameIdReqBody } from './schemas/api-patch-admin-board-game-id-req-body.schema';
import { ApiDeleteAdminBoardGameIdResData } from './schemas/api-delete-admin-board-game-id-res-data.schema';
import { ApiGetAdminBoardGameListResData } from './schemas/api-get-admin-board-game-list-res-data.schema';
import { ErrorCode } from 'src/libs/http-exceptions/error-codes';
import { ApiGetAdminBoardGameIdResData } from './schemas/api-get-admin-board-game-id-res-data.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UploadFileService } from 'src/upload-file/upload-file.service';

@ApiTags(SwaggerTag.AdminBoardGame)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN)
@ApiUnauthorizedResponse()
@ApiExpiredTokenResponse()
@ApiForbiddenResponse(ErrorCode.NoPermission)
@Controller('admin/board-game')
export class AdminBoardGameController {
  constructor(
    private readonly adminBoardGameService: AdminBoardGameService,
    private readonly uploadFileService: UploadFileService,
  ) {}

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
  ): Promise<ApiGetAdminBoardGameListResData> {
    const promiseBoardGames = this.adminBoardGameService.findAll(
      rowsPerPage,
      page,
      keyword,
    );
    const promiseTotalCount = this.adminBoardGameService.getAllCount(keyword);
    const [boardGames, totalCount] = await Promise.all([
      promiseBoardGames,
      promiseTotalCount,
    ]);
    return { boardGames, totalCount };
  }

  @Get(':id')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiGetAdminBoardGameIdResData) },
  })
  @ApiNotFoundResponse(
    AdminBoardGameService.ErrorNotFoundBoardGame.toApiResponseOptions(),
  )
  async findById(@Param('id', ParseIntPipe) id: number) {
    const boardGame = await this.adminBoardGameService.findOneById(id);

    return { boardGame };
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

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.uploadFileService.uploadBoardGameImage(file);
    return {
      file: url,
    };
  }
}
