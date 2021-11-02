import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: 'Google ID Token',
  })
  idToken: string;
}
