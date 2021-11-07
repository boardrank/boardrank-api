import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';

export class ApiPatchUserIdReqBody {
  @ApiProperty({
    type: () => UpdateUserDto,
  })
  user: UpdateUserDto;
}
