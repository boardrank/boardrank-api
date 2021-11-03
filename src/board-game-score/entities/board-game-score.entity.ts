import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { BoardGameScore as BoardGameScoreType } from 'prisma/prisma-client';

@ApiExtraModels()
export class BoardGameScore implements BoardGameScoreType {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 8,
    description: '1 ~ 10',
  })
  score: number;

  @ApiProperty({
    example: 10,
    description: 'id가 10인 사용자',
  })
  userId: number;

  @ApiProperty({
    example: 3,
  })
  boardGameId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
