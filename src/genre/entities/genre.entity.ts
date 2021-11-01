import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class Genre {
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
