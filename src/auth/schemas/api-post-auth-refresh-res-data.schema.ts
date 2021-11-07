import { ApiProperty } from '@nestjs/swagger';

export class ApiPostAuthRefreshResData {
  @ApiProperty({
    description: 'RefreshToken',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'AccessToken',
  })
  accessToken: string;
}
