import { ApiProperty } from '@nestjs/swagger';
import { BoardGameDetail } from '../vo/board-game-detail.vo';

export class ApiGetBoardGameIdResData {
  @ApiProperty({
    type: () => BoardGameDetail,
  })
  boardGame: BoardGameDetail;
}
