import { AdminBoardGameListItem } from '../vo/admin-board-game-list-item.vo';
import { ApiProperty } from '@nestjs/swagger';

export class ApiGetAdminBoardGameListResData {
  @ApiProperty({
    type: () => [AdminBoardGameListItem],
  })
  boardGames: AdminBoardGameListItem[];

  @ApiProperty()
  totalCount: number;
}
