import { ApiProperty } from '@nestjs/swagger';
import { BoardGame } from '../vo/board-game.vo';

export class ApiDeleteBoardGameIdResData {
  @ApiProperty({
    type: () => BoardGame,
  })
  boardGame: BoardGame;
}
