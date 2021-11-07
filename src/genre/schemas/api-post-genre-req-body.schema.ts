import { ApiProperty } from '@nestjs/swagger';
import { CreateGenreDto } from '../dto/create-genre.dto';

export class ApiPostGenreReqBody {
  @ApiProperty({
    type: () => CreateGenreDto,
  })
  genre: CreateGenreDto;
}
