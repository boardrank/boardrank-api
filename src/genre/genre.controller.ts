import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SwaggerTag } from '../../libs/constants';
import { Genre } from './entities/genre.entity';
import { Roles } from '../../libs/decorators/role.decorator';
import { JwtAuthGuard } from '../../libs/guards/jwt-auth.guard';
import { Role } from '../auth/entities/role';
import { RolesGuard } from '../../libs/guards/roles.guard';
import { ApiUnauthorizedResponse } from '../../libs/decorators/api-unauthorized-response.decorator';
import { ApiForbiddenResponse } from '../../libs/decorators/api-forbidden-response.decorator';

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
    schema: { $ref: getSchemaPath(Genre) },
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiConflictResponse({
    description: GenreService.ErrorAlreadyRegistered.toDescription(),
  })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
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
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
