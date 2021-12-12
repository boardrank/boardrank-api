import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role';

export class AccessTokenPayloadDto<TRole = Role> {
  @ApiProperty({
    description: 'Issuer',
  })
  iss: string;

  @ApiProperty({
    description: 'User identifier, PK',
  })
  aud: number;

  @ApiProperty({
    description: 'User nickname',
  })
  nickname: string;

  @ApiProperty({
    description: 'User profile url',
  })
  profileUrl: string;

  @ApiProperty({
    description: 'Token 만료',
  })
  exp: number;
}
