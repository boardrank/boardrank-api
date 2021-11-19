import { ApiProperty } from '@nestjs/swagger';
import { BoardGame } from './board-game.vo';
import { BoardGameReply } from 'src/board-game-reply/vo/board-game-reply.vo';
import { BoardGameScore } from 'src/board-game-score/vo/board-game-score.vo';

export class BoardGameDetail extends BoardGame {
  @ApiProperty({
    type: Number,
    example: 9,
    description: '평점',
  })
  averageScore: number;

  @ApiProperty({
    type: Number,
    example: 2,
    description: '랭킹',
  })
  rank: number;

  @ApiProperty({
    type: Number,
  })
  myScore?: number;

  @ApiProperty({
    type: () => [BoardGameScore],
  })
  boardGameScores: BoardGameScore[];

  // @ApiProperty({
  //   type: () => [BoardGameReply],
  // })
  // boardGameReplies: BoardGameReply[];
}
