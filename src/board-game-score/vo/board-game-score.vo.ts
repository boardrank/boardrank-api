import { ApiProperty } from '@nestjs/swagger';

export class BoardGameScore {
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

  @ApiProperty({
    example: '너무 재밌어요!!',
  })
  comment: string;

  @ApiProperty({
    type: Date,
    example: '2022-01-09T07:32:50.127Z',
  })
  createdAt: Date;
}
