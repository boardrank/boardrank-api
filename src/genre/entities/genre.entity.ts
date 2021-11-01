import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { Genre as GenreType } from '.prisma/client';

@ApiExtraModels()
export class Genre implements GenreType {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'STRATEGY',
  })
  code: string;

  @ApiProperty({
    example: '전략',
  })
  name: string;

  @ApiProperty({
    example: 1,
  })
  order: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
