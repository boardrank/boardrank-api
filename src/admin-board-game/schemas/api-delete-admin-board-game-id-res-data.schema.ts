import { ApiProperty } from '@nestjs/swagger';
import { BoardGame } from '../../board-game/vo/board-game.vo';

export class ApiDeleteAdminBoardGameIdResData {
  @ApiProperty({
    type: () => BoardGame,
  })
  boardGame: BoardGame;
}
