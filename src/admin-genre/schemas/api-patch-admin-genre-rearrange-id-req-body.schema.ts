import { ApiProperty } from '@nestjs/swagger';

export class ApiPatchAdminGenreRearrangeIdReqBody {
  @ApiProperty()
  source: number;

  @ApiProperty()
  destination: number;
}
