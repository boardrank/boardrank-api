import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.vo';

export class UserListItem extends User {
  @ApiProperty({
    description: '회원 가입 일자',
  })
  createdAt: Date;
}
