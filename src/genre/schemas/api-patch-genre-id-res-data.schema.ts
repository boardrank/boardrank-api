import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { Genre } from '../vo/genre.vo';

@ApiExtraModels()
export class ApiPatchGenreIdResData {
  @ApiProperty({
    type: () => Genre,
  })
  genre: Genre;
}
