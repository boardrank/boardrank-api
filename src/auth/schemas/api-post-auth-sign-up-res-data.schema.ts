import { ApiProperty } from '@nestjs/swagger';

export class ApiPostAuthSignUpResData {
  @ApiProperty({
    description: 'AccessToken',
  })
  accessToken: string;
}
