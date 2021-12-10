import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../vo/genre.vo';

export class ApiPatchAdminGenreRearrangeIdResData {
  @ApiProperty({
    type: () => [Genre],
  })
  genres: Genre[];
}
