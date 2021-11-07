import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { Genre } from '../vo/genre.vo';

@ApiExtraModels()
export class ApiPostGenreResData {
  @ApiProperty({
    type: () => Genre,
  })
  genre: Genre;
}
