import { ApiProperty } from '@nestjs/swagger';
import { CreateBoardGameReplyDto } from '../dto/create-board-game-reply.dto';

export class ApiPostBoardGameReplyReqBody {
  @ApiProperty({
    type: () => CreateBoardGameReplyDto,
  })
  boardGameReply: CreateBoardGameReplyDto;
}
