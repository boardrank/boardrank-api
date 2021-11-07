import { ApiProperty } from '@nestjs/swagger';

export class ApiPostAuthSignInReqBody {
  @ApiProperty({
    description: 'Google ID Token',
  })
  idToken: string;
}
