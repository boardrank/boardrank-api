import { ApiProperty } from '@nestjs/swagger';
import { AdminUser } from '../vo/admin-user.vo';

export class ApiPatchAdminUserIdResData {
  @ApiProperty({
    type: () => AdminUser,
  })
  user: AdminUser;
}
