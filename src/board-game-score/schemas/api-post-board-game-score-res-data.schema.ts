import { ApiProperty } from '@nestjs/swagger';
import { BoardGameScore } from '../vo/board-game-score.vo';

export class ApiPostBoardGameScoreResData {
  @ApiProperty({
    type: () => BoardGameScore,
  })
  boardGameScore: BoardGameScore;

  @ApiProperty({
    type: Number,
    example: 8,
  })
  averageScore: number;
}
