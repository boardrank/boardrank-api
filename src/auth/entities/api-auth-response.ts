import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class ApiAuthResponse {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessToken: string;
}
