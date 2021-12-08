import { ApiProperty } from '@nestjs/swagger';
import { UpdateGenreDto } from '../dto/update-genre.dto';

export class ApiPatchAdminGenreIdReqBody {
  @ApiProperty({
    type: () => UpdateGenreDto,
  })
  genre: UpdateGenreDto;
}
