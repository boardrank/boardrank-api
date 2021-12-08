import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({
    type: String,
    example: 'STRATEGY',
  })
  code: string;

  @ApiProperty({
    type: String,
    example: '전략',
  })
  name: string;
}
