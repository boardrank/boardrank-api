import { ApiProperty } from '@nestjs/swagger';

export type Code =
  | 'STRATEGY'
  | 'ABSTRACT'
  | 'WITS'
  | 'BATTLE'
  | 'REASONING'
  | 'CARD'
  | 'TILE'
  | 'THEME';

export type Name =
  | '전략'
  | '추상'
  | '순발력'
  | '전투'
  | '추리'
  | '카드게임'
  | '타일'
  | '테마';

export class CreateGenreDto {
  @ApiProperty({
    type: String,
    example: 'STRATEGY',
  })
  code: Code;

  @ApiProperty({
    type: String,
    example: '전략',
  })
  name: Name;
}
