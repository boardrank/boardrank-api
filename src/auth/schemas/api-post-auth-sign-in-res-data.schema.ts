import { ApiProperty } from '@nestjs/swagger';

export class ApiPostAuthSignInResData {
  @ApiProperty({
    description: 'AccessToken',
  })
  accessToken: string;
}
