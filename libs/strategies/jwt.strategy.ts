import { ExtractJwt, Strategy } from 'passport-jwt';

import { AccessTokenPayloadDto } from 'src/auth/dto/access-token-payload.dto';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '.prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate({
    aud,
    nickname,
    role,
  }: AccessTokenPayloadDto): Pick<User, 'id' | 'nickname' | 'role'> {
    return { id: aud, nickname, role };
  }
}
