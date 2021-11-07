import { ApiProperty } from '@nestjs/swagger';
import { User } from '../vo/user.vo';

export class ApiPatchUserResData {
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
