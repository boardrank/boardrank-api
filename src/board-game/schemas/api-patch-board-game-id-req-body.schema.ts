import { ApiProperty } from '@nestjs/swagger';
import { UpdateBoardGameDto } from '../dto/update-board-game.dto';

export class ApiPatchBoardGameIdReqBody {
  @ApiProperty({
    type: () => UpdateBoardGameDto,
  })
  boardGame: UpdateBoardGameDto;
}
