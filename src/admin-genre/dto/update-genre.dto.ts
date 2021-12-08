import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateGenreDto } from './create-genre.dto';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  order?: number;
}
