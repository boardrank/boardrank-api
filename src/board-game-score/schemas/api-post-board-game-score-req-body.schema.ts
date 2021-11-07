import { ApiProperty } from '@nestjs/swagger';
import { CreateBoardGameScoreDto } from '../dto/create-board-game-score.dto';

export class ApiPostBoardGameScoreReqBody {
  @ApiProperty({
    type: () => CreateBoardGameScoreDto,
  })
  boardGameScore: CreateBoardGameScoreDto;
}
