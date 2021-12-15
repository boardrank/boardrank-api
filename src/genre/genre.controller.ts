import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { ApiGetGenreListResData } from './schemas/api-get-genre-list-res-data.schema';
import { GenreService } from './genre.service';
import { SwaggerTag } from 'src/libs/constants';

@ApiTags(SwaggerTag.Genre)
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('/list')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiGetGenreListResData) },
  })
  async findAll(): Promise<ApiGetGenreListResData> {
    const genres = await this.genreService.findAll();
    return { genres };
  }
}
