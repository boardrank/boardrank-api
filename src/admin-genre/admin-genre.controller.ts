import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AdminGenreService } from './admin-genre.service';
import { ApiExpiredTokenResponse } from 'libs/decorators/api-expired-token-response.decorator';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { Role } from 'src/auth/entities/role';
import { Roles } from 'libs/decorators/role.decorator';
import { RolesGuard } from 'libs/guards/roles.guard';
import { SwaggerTag } from 'libs/constants';
import { ApiPostAdminGenreResData } from './schemas/api-post-admin-genre-res-data.schema';
import { ApiPostAdminGenreReqBody } from './schemas/api-post-admin-genre-req-body.schema';
import { ApiPatchAdminGenreIdResData } from './schemas/api-patch-admin-genre-id-res-data.schema';
import { ApiPatchAdminGenreIdReqBody } from './schemas/api-patch-admin-genre-id-req-body.schema';
import { ApiDeleteAdminGenreIdResData } from 'src/admin-board-game/schemas/api-delete-admin-genre-id-res-data.schema';
import { ApiGetAdminGenreListResData } from './schemas/api-get-admin-genre-list-res-data.schema';

@ApiTags(SwaggerTag.AdminGenre)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiUnauthorizedResponse()
@ApiExpiredTokenResponse()
@ApiForbiddenResponse()
@Controller('admin/genre')
export class AdminGenreController {
  constructor(private readonly adminGenreService: AdminGenreService) {}

  @Post()
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiPostAdminGenreResData) },
  })
  @ApiConflictResponse(
    AdminGenreService.ErrorAlreadyRegistered.toApiResponseOptions(),
  )
  async create(
    @Body() body: ApiPostAdminGenreReqBody,
  ): Promise<ApiPostAdminGenreResData> {
    const genre = await this.adminGenreService.create(body.genre);
    return { genre };
  }

  @Get('/list')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiGetAdminGenreListResData) },
  })
  async findAll(): Promise<ApiGetAdminGenreListResData> {
    const genres = await this.adminGenreService.findAll();
    return { genres };
  }

  @Patch(':id')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiPatchAdminGenreIdResData) },
  })
  @ApiNotFoundResponse(AdminGenreService.ErrorNotFound.toApiResponseOptions())
  @ApiConflictResponse(
    AdminGenreService.ErrorAlreadyRegistered.toApiResponseOptions(),
  )
  async update(
    @Param('id') id: string,
    @Body() body: ApiPatchAdminGenreIdReqBody,
  ): Promise<ApiPatchAdminGenreIdResData> {
    const genre = await this.adminGenreService.update(+id, body.genre);
    return { genre };
  }

  @Delete(':id')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiDeleteAdminGenreIdResData) },
  })
  @ApiNotFoundResponse(AdminGenreService.ErrorNotFound.toApiResponseOptions())
  @ApiConflictResponse(
    AdminGenreService.ErrorHasReference.toApiResponseOptions(),
  )
  async remove(@Param('id') id: string): Promise<ApiDeleteAdminGenreIdResData> {
    const genre = await this.adminGenreService.remove(+id);
    return { genre };
  }
}