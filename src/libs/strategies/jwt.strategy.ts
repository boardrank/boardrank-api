import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger } from '@nestjs/common';

import { AccessTokenPayloadDto } from 'src/auth/dto/access-token-payload.dto';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

export type UserByAccessToken = Pick<User, 'id' | 'nickname'>;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  logger = new Logger('JwtStrategy');

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({
    aud,
    nickname,
  }: AccessTokenPayloadDto): Promise<UserByAccessToken> {
    return { id: aud, nickname };
  }
}
