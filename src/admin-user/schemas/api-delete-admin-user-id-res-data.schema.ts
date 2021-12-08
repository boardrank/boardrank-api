import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/vo/user.vo';

export class ApiDeleteAdminUserIdResData {
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
