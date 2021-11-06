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
import { ApiAlreadyRegisteredErrorResponse } from 'libs/http-exceptions/api-has-reference-error-response';
import { Role } from 'src/auth/entities/role';
import { ApiPostGenreReqBodyDto } from './dto/api-post-genre-req-body.dto';
import { ApiPostGenreResDataDto } from './dto/api-post-genre-res-data.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';

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
    schema: { $ref: getSchemaPath(ApiPostGenreReqBodyDto) },
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiConflictResponse({
    description: GenreService.ErrorAlreadyRegistered.toDescription(),
    schema: { $ref: getSchemaPath(ApiAlreadyRegisteredErrorResponse) },
  })
  create(
    @Body() genreDto: ApiPostGenreReqBodyDto,
  ): Promise<ApiPostGenreResDataDto> {
    return this.genreService.create(genreDto);
  }

  @Get('/list')
  @ApiOkResponse({
    schema: { type: 'array', items: { $ref: getSchemaPath(Genre) } },
  })
  findAll() {
    return this.genreService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(Genre) },
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse({
    description: GenreService.ErrorNotFound.toDescription(),
  })
  @ApiConflictResponse({
    description: GenreService.ErrorAlreadyRegistered.toDescription(),
  })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(Genre) },
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse({
    description: GenreService.ErrorNotFound.toDescription(),
  })
  @ApiConflictResponse({
    description: GenreService.ErrorHasReference.toDescription(),
  })
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
