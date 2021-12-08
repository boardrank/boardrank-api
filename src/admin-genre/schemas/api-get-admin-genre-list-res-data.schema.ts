import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../vo/genre.vo';

export class ApiGetAdminGenreListResData {
  @ApiProperty({
    type: () => [Genre],
  })
  genres: Genre[];
}
