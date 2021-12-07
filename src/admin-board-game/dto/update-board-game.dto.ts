import { CreateBoardGameDto } from './create-board-game.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateBoardGameDto extends PartialType(CreateBoardGameDto) {}
