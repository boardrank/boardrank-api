import { ApiProperty } from '@nestjs/swagger';
import { BoardGame } from '../../board-game/vo/board-game.vo';

export class ApiPostAdminBoardGameResData {
  @ApiProperty({
    type: () => BoardGame,
  })
  boardGame: BoardGame;
}
