import { ApiProperty } from '@nestjs/swagger';

export class ApiPostAuthSignUpResData {
  @ApiProperty({
    description: 'RefreshToken',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'AccessToken',
  })
  accessToken: string;
}
