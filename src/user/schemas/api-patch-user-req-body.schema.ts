import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';

export class ApiPatchUserReqBody {
  @ApiProperty({
    type: () => UpdateUserDto,
  })
  user: UpdateUserDto;
}
