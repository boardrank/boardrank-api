import { ApiProperty } from '@nestjs/swagger';
import { UpdateBoardGameReplyDto } from '../dto/update-board-game-reply.dto';

export class ApiPatchBoardGameReplyReqBody {
  @ApiProperty({
    type: () => UpdateBoardGameReplyDto,
  })
  boardGameReply: UpdateBoardGameReplyDto;
}
