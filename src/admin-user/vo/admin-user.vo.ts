import { ApiProperty } from '@nestjs/swagger';

export class AdminUser {
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
    description: 'User role',
    enum: ['ADMIN', 'MEMBER'],
  })
  role: 'ADMIN' | 'MEMBER';

  @ApiProperty({
    description: '사용자 상태',
    enum: ['ACTIVATE', 'BLOCK', 'DORMANT', 'WITHDRAWAL'],
  })
  status: 'ACTIVATE' | 'BLOCK' | 'DORMANT' | 'WITHDRAWAL';
}
