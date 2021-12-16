import { ApiProperty } from '@nestjs/swagger';
import { UpdateBoardGameDto } from '../dto/update-board-game.dto';

export class ApiPatchAdminBoardGameIdReqBody {
  @ApiProperty({
    type: () => UpdateBoardGameDto,
  })
  boardGame: string | UpdateBoardGameDto;
}
