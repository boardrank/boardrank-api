import { PartialType } from '@nestjs/swagger';
import { CreateBoardGameReplyDto } from './create-board-game-reply.dto';

export class UpdateBoardGameReplyDto extends PartialType(CreateBoardGameReplyDto) {}
