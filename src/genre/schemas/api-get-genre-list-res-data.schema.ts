import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../vo/genre.vo';

export class ApiGetGenreListResData {
  @ApiProperty({
    type: () => [Genre],
  })
  genres: Genre[];
}
