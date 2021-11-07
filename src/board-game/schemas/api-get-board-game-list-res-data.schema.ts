import { ApiProperty } from '@nestjs/swagger';
import { BoardGameListItem } from '../vo/board-game-list-item.vo';

export class ApiGetBoardGameListResData {
  @ApiProperty({
    type: () => [BoardGameListItem],
  })
  boardGames: BoardGameListItem[];
}
