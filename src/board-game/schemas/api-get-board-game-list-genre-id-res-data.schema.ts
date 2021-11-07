import { ApiProperty } from '@nestjs/swagger';
import { BoardGameListItem } from '../vo/board-game-list-item.vo';

export class ApiGetBoardGameListGenreIdResData {
  @ApiProperty({
    type: () => [BoardGameListItem],
  })
  boardGames: BoardGameListItem[];
}
