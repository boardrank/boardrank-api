import { ApiProperty } from '@nestjs/swagger';
import { AdminUser } from './admin-user.vo';

export class UserListItem extends AdminUser {
  @ApiProperty({
    description: '회원 가입 일자',
  })
  createdAt: Date;
}
