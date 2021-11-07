import { ApiProperty } from '@nestjs/swagger';

export class ApiPostAuthSignUpReqBody {
  @ApiProperty({
    description: 'Google ID Token',
  })
  idToken: string;
}
