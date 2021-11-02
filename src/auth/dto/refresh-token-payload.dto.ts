import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenPayloadDto {
  @ApiProperty({
    description: 'Issuer',
  })
  iss: string;

  @ApiProperty({
    description: 'User identifier, PK',
  })
  aud: number;
}
