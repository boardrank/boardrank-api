import { ApiProperty } from '@nestjs/swagger';
import { UserListItem } from '../vo/user-list-item.vo';

export class ApiGetUserListResData {
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
