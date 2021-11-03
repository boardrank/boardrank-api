import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/entities/role';

export class CreateUserDto {
  @ApiProperty({
    example: '102370123451484861793',
  })
  oauthId: string;

  @ApiProperty({
    example: 'Board Ranker',
  })
  nickname: string;

  @ApiProperty({
    example:
      'https://lh3.googleusercontent.com/a/AATXAJz5ndmF-bd60u3eq0e6m5lHtFM11R7S80oCAeRY=s96-c',
  })
  profileUrl: string;

  @ApiProperty({
    example: 'ADMIN | MEMBER',
  })
  role: Role;
}
