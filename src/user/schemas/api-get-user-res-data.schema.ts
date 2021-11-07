import { ApiProperty } from '@nestjs/swagger';
import { User } from '../vo/user.vo';

export class ApiGetUserResData {
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
