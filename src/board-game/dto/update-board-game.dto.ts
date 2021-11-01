import { PartialType } from '@nestjs/swagger';
import { CreateBoardGameDto } from './create-board-game.dto';

export class UpdateBoardGameDto extends PartialType(CreateBoardGameDto) {}
