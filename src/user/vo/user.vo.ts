import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: `default: google profile's name`,
  })
  nickname: string;

  @ApiProperty({
    description: `default: google profile's picture`,
  })
  profileUrl: string;

  @ApiProperty({
    description: '사용자 역할',
    enum: ['ADMIN', 'MEMBER'],
  })
  role: 'ADMIN' | 'MEMBER';
}
