import { ApiProperty } from '@nestjs/swagger';
import { BoardGameReply } from './board-game-reply.vo';

export class ApiPatchBoardGameReplyResData {
  @ApiProperty({
    type: () => BoardGameReply,
  })
  boardGameReply: BoardGameReply;
}
