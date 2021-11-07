import { ApiProperty } from '@nestjs/swagger';
import { User } from '../vo/user.vo';

export class ApiGetUserIdResData {
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
