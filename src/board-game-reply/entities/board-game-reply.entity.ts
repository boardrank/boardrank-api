import { ApiProperty } from '@nestjs/swagger';
import { BoardGameReply as BoardGameReplyType } from '.prisma/client';

export class BoardGameReply implements BoardGameReplyType {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '이것은 댓글 내용입니다.',
  })
  content: string;

  @ApiProperty({
    example: 1,
  })
  userId: number;

  @ApiProperty({
    example: 1,
  })
  boardGameId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
