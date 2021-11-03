import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardGameReplyDto {
  @ApiProperty({
    example: '이것은 댓글입니다',
  })
  content: string;

  @ApiProperty({
    example: 3,
    description: 'BoardGame ID',
  })
  boardGameId: number;
}
