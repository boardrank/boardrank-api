import { ApiProperty } from '@nestjs/swagger';

export class AdminBoardGameListItem {
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

  @ApiProperty()
  createdAt: Date;
}
