import { ApiProperty } from '@nestjs/swagger';
import { User } from '../vo/user.vo';

export class ApiPatchUserIdResData {
  @ApiProperty({
    type: () => User,
  })
  user: User;
}
