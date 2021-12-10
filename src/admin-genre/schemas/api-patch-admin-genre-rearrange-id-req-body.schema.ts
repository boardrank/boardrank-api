import { ApiProperty } from '@nestjs/swagger';

export class ApiPatchAdminGenreRearrageIdReqBody {
  @ApiProperty()
  source: number;

  @ApiProperty()
  destination: number;
}
