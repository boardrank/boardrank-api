import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../../genre/vo/genre.vo';

export class ApiDeleteAdminGenreIdResData {
  @ApiProperty({
    type: () => Genre,
  })
  genre: Genre;
}
