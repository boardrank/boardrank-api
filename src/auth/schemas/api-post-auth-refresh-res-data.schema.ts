import { ApiProperty } from '@nestjs/swagger';

export class ApiPostAuthRefreshResData {
  @ApiProperty({
    description: 'AccessToken',
  })
  accessToken: string;
}
