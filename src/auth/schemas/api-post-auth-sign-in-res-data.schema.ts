import { ApiProperty } from '@nestjs/swagger';

export class ApiPostAuthSignInResData {
  @ApiProperty({
    description: 'RefreshToken',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'AccessToken',
  })
  accessToken: string;
}
