import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDto } from '../../user/dto/update-user.dto';

export class ApiPatchAdminUserIdReqBody {
  @ApiProperty({
    type: () => UpdateUserDto,
  })
  user: UpdateUserDto;
}
