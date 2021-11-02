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
  })
  role: Role;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
