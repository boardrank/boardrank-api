import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { BoardGame as BoardGameType } from '.prisma/client';

@ApiExtraModels()
export class BoardGame implements BoardGameType {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '마라케시',
  })
  name: string;

  @ApiProperty({
    example: '격자에서 이동,영역내 영향력,주사위(룰렛) 굴리고 이동,타일 놓기',
  })
  description: string;

  @ApiProperty()
  thumbnailUrl: string;

  @ApiProperty({
    example: 'Dominique Ehrhard',
  })
  designer: string;

  @ApiProperty({
    example: 3,
    description: '1 ~ 5',
  })
  difficulty: number;

  @ApiProperty({
    example: '2명 ~ 4명',
  })
  personnel: string;

  @ApiProperty({
    example: '2명 ~ 4명',
  })
  recommendPersonnel: string;

  @ApiProperty({
    example: 20,
    description: '20 => 20분',
  })
  playTime: number; // 분 단위

  @ApiProperty({
    example: 8,
    description: '8 => 8세 이상',
  })
  age: number; // 8 => 8세 이상

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
