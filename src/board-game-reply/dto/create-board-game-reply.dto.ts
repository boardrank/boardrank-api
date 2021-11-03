import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardGameReplyDto {
  @ApiProperty({
    example: 8,
    description: '1 ~ 10',
  })
  content: number;

  @ApiProperty({
    example: 3,
    description: 'BoardGame ID',
  })
  boardGameId: number;
}
