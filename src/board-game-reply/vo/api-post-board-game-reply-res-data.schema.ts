import { ApiProperty } from '@nestjs/swagger';
import { BoardGameReply } from './board-game-reply.vo';

export class ApiPostBoardGameReplyResData {
  @ApiProperty({
    type: () => BoardGameReply,
  })
  boardGameReply: BoardGameReply;
}
