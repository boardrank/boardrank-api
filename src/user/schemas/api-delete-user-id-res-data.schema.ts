import { ApiProperty } from '@nestjs/swagger';
import { User } from '../vo/user.vo';

export class ApiDeleteUserIdResData {
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
