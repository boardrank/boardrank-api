import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
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
import { Role } from 'src/auth/entities/role';
import { ApiPostGenreResData } from './schemas/api-post-genre-res-data.schema';
import { GenreService } from './genre.service';
import { ApiPostGenreReqBody } from './schemas/api-post-genre-req-body.schema';
import { ApiGetGenreListResData } from './schemas/api-get-genre-list-res-data.schema';
import { ApiPatchGenreIdReqBody } from './schemas/api-patch-genre-id-req-body.schema';
import { ApiPatchGenreIdResData } from './schemas/api-patch-genre-id-res-data.schema';
import { ApiDeleteGenreIdResData } from './schemas/api-delete-genre-id-res-data.schema';
import { ApiExpiredTokenResponse } from 'libs/decorators/api-expired-token-response.decorator';

@ApiTags(SwaggerTag.Genre)
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
  logger = new Logger('GenreController');

  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiPostGenreResData) },
  })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse()
  @ApiConflictResponse(
    GenreService.ErrorAlreadyRegistered.toApiResponseOptions(),
  )
  async create(
    @Body() body: ApiPostGenreReqBody,
  ): Promise<ApiPostGenreResData> {
    const genre = await this.genreService.create(body.genre);
    return { genre };
  }

  @Get('/list')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiGetGenreListResData) },
  })
  async findAll(): Promise<ApiGetGenreListResData> {
    const genres = await this.genreService.findAll();
    return { genres };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiPatchGenreIdResData) },
  })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(GenreService.ErrorNotFound.toApiResponseOptions())
  @ApiConflictResponse(
    GenreService.ErrorAlreadyRegistered.toApiResponseOptions(),
  )
  async update(
    @Param('id') id: string,
    @Body() body: ApiPatchGenreIdReqBody,
  ): Promise<ApiPatchGenreIdResData> {
    const genre = await this.genreService.update(+id, body.genre);
    return { genre };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiDeleteGenreIdResData) },
  })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(GenreService.ErrorNotFound.toApiResponseOptions())
  @ApiConflictResponse(GenreService.ErrorHasReference.toApiResponseOptions())
  async remove(@Param('id') id: string): Promise<ApiDeleteGenreIdResData> {
    const genre = await this.genreService.remove(+id);
    return { genre };
  }
}
