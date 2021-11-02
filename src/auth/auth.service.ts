import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { verifyIdToken } from '../../libs/auth-google';
import { ApiErrorResponse } from '../../libs/http-exceptions/api-error-response';
import { ErrorCode } from '../../libs/http-exceptions/error-codes';
import { PrismaService } from '../../src/prisma/prisma.service';
import { ApiAuthResponse } from './entities/api-auth-response';
import { Role } from './entities/role';

@Injectable()
export class AuthService {
  static ErrorInvalidIdToken = new ApiErrorResponse(
    ErrorCode.InvalidToken,
    '유효하지 않은 토큰입니다.',
  );

  logger = new Logger('AuthService');

  constructor(private prismaService: PrismaService) {}

  async signUp(idToken: string): Promise<ApiAuthResponse> {
    const payload = await verifyIdToken(idToken);

    if (!payload) {
      throw new BadRequestException(AuthService.ErrorInvalidIdToken);
    }

    const oauthId = payload.sub;
    const nickname = payload.name || '';
    const profileUrl = payload.picture || '';
    const role = Role.MEMBER;

    try {
      const user = await this.prismaService.user.create({
        data: {
          oauthId,
          nickname,
          profileUrl,
          role,
        },
      });

      console.log(user);

      return {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };
    } catch (error) {
      this.logger.log(error);
    }
  }

  async signIn(idToken: string): Promise<ApiAuthResponse> {
    const payload = await verifyIdToken(idToken);

    if (!payload) {
      throw new BadRequestException(AuthService.ErrorInvalidIdToken);
    }

    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }

  async refresh(idToken: string): Promise<ApiAuthResponse> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }
}
