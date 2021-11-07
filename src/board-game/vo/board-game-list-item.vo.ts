import { ApiProperty } from '@nestjs/swagger';
import { BoardGame } from './board-game.vo';
import { Genre } from 'src/genre/vo/genre.vo';

export class BoardGameListItem extends BoardGame {
  @ApiProperty({
    type: Number,
    example: 9,
    description: '평점',
  })
  averageScore: number;
}
