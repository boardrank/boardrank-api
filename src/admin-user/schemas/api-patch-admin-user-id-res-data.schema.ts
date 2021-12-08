import { ApiProperty } from '@nestjs/swagger';
import { User } from '../vo/user.vo';

export class ApiPatchAdminUserIdResData {
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
