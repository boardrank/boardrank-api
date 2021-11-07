import { ApiProperty } from '@nestjs/swagger';
import { BoardGame } from './board-game.vo';
import { BoardGameReply } from 'src/board-game-reply/vo/board-game-reply.vo';

export class BoardGameDetail extends BoardGame {
  @ApiProperty({
    type: Number,
    example: 9,
    description: '평점',
  })
  averageScore: number;

  @ApiProperty({
    type: Number,
  })
  myScore?: number;

  @ApiProperty({
    type: () => [BoardGameReply],
  })
  boardGameReplies: BoardGameReply[];
}
