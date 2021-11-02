import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'Google ID Token',
  })
  idToken: string;
}
