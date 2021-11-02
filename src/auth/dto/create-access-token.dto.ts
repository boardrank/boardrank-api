import { Role } from '../entities/role';

export class CreateAccessTokenDto<TRole = Role> {
  id: number;
  nickname: string;
  profileUrl: string;
  role: TRole;
}
