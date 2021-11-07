import { ApiProperty } from '@nestjs/swagger';

export class ApiPostAuthRefreshReqBody {
  @ApiProperty({
    description: 'Refresh token',
  })
  refreshToken: string;
}
