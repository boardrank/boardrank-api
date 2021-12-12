import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { Role } from 'src/auth/entities/role';
import { User as UserType } from '.prisma/client';

@ApiExtraModels()
export class User implements UserType {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '102370881298734861793',
  })
  oauthId: string;

  @ApiProperty({
    description: `default: google profile's name`,
  })
  nickname: string;

  @ApiProperty({
    description: `default: google profile's picture`,
  })
  profileUrl: string;

  @ApiProperty({
    description: 'ADMIN | MEMBER',
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    description: '사용자 상태',
    enum: ['ACTIVATE', 'BLOCK', 'DORMANT', 'WITHDRAWAL'],
  })
  status: 'ACTIVATE' | 'BLOCK' | 'DORMANT' | 'WITHDRAWAL';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
