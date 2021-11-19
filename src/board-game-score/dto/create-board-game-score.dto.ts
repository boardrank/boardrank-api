import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardGameScoreDto {
  @ApiProperty({
    example: 8,
    description: '1 ~ 10',
  })
  score: number;

  @ApiProperty({
    example: '너무 너무 재밌어요!!!',
  })
  comment: string;

  @ApiProperty({
    example: 3,
    description: 'BoardGame ID',
  })
  boardGameId: number;
}
