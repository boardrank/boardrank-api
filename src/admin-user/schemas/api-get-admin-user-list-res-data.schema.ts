import { ApiProperty } from '@nestjs/swagger';
import { UserListItem } from '../../user/vo/user-list-item.vo';

export class ApiGetAdminUserListResData {
  @ApiProperty({
    type: () => [UserListItem],
  })
  users: UserListItem[];

  @ApiProperty({
    type: Number,
    example: 1,
  })
  totalCount: number;
}
