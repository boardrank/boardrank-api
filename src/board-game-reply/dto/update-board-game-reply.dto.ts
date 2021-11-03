import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardGameReplyDto {
  @ApiProperty({
    example: '이것은 댓글입니다',
  })
  content: string;
}
