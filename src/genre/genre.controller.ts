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
import { ApiCreatedResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { SwaggerTags } from 'libs/constants';
import { Genre } from './entities/genre.entity';

@ApiTags(SwaggerTags.Genre)
@Controller('genre')
export class GenreController {
  logger = new Logger('GenreController');

  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(Genre) },
  })
  create(@Body() createGenreDto: CreateGenreDto) {
    try {
      return this.genreService.create(createGenreDto);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get('/list')
  findAll() {
    return this.genreService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
