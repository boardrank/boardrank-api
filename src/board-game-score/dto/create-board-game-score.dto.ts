import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardGameScoreDto {
  @ApiProperty({
    example: 8,
    description: '1 ~ 10',
  })
  score: number;

  @ApiProperty({
    example: 3,
    description: 'BoardGame ID',
  })
  boardGameId: number;
}
