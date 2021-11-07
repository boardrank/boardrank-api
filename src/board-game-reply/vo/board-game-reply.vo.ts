import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/vo/user.vo';

export class BoardGameReply {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '이것은 댓글 내용입니다.',
  })
  content: string;

  @ApiProperty({
    example: 1,
  })
  userId: number;

  @ApiProperty({
    example: 1,
  })
  boardGameId: number;

  @ApiProperty({
    type: () => User,
  })
  user: User;
}
