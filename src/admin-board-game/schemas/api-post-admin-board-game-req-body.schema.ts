import { ApiProperty } from '@nestjs/swagger';
import { CreateBoardGameDto } from '../dto/create-board-game.dto';

export class ApiPostAdminBoardGameReqBody {
  @ApiProperty({
    type: () => CreateBoardGameDto,
  })
  boardGame: CreateBoardGameDto;
}
