import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/entities/role';

export class UpdateUserDto {
  @ApiProperty({
    example: '102370123451484861793',
  })
  oauthId?: string;

  @ApiProperty({
    example: 'Board Ranker',
  })
  nickname?: string;

  @ApiProperty({
    example:
      'https://lh3.googleusercontent.com/a/AATXAJz5ndmF-bd60u3eq0e6m5lHtFM11R7S80oCAeRY=s96-c',
  })
  profileUrl?: string;

  @ApiProperty({
    example: 'ADMIN | MEMBER',
    enum: Role,
  })
  role?: Role;

  @ApiProperty({
    description: '사용자 상태',
    enum: ['ACTIVATE', 'BLOCK', 'DORMANT', 'WITHDRAWAL'],
  })
  status?: 'ACTIVATE' | 'BLOCK' | 'DORMANT' | 'WITHDRAWAL';
}
