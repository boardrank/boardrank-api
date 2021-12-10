import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../vo/genre.vo';

export class ApiPatchAdminGenreRearrageIdResData {
  @ApiProperty({
    type: () => [Genre],
  })
  genres: Genre[];
}
