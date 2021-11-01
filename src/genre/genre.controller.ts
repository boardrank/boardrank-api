import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
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
import { SwaggerTags } from 'libs/constants';
import { Genre } from './entities/genre.entity';

@ApiTags(SwaggerTags.Genre)
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
  logger = new Logger('GenreController');

  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(Genre) },
  })
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
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(Genre) },
  })
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
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(Genre) },
  })
  @ApiNotFoundResponse({
    description: GenreService.ErrorNotFound.toDescription(),
  })
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
