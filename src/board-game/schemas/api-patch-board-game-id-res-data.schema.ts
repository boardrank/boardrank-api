import { ApiProperty } from '@nestjs/swagger';
import { BoardGame } from '../vo/board-game.vo';

export class ApiPatchBoardGameIdResData {
  @ApiProperty({
    type: () => BoardGame,
  })
  boardGame: BoardGame;
}
