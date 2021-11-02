import { Role } from '../entities/role';

export class AccessTokenPayloadDto<TRole = Role> {
  iss: string;
  aud: number;
  nickname: string;
  profileUrl: string;
  role: TRole;
}
