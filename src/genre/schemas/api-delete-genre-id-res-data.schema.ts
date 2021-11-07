import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../vo/genre.vo';

export class ApiDeleteGenreIdResData {
  @ApiProperty({
    type: () => Genre,
  })
  genre: Genre;
}
