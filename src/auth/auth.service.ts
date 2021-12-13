import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { AccessTokenPayloadDto } from './dto/access-token-payload.dto';
import { ApiAlreadyRegisteredErrorResponse } from 'libs/http-exceptions/api-has-reference-error-response';
import { ApiAuthResponse } from './entities/api-auth-response';
import { ApiInvalidTokenErrorResponse } from 'libs/http-exceptions/api-invalid-token-error-response';
import { ApiNotFoundErrorResponse } from 'libs/http-exceptions/api-not-found-error-response';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefreshTokenPayloadDto } from './dto/refresh-token-payload.dto';
import { Role } from './entities/role';
import { UserService } from 'src/user/user.service';
import { verifyIdToken } from 'libs/auth-google';

@Injectable()
export class AuthService {
  static ErrorInvalidToken = new ApiInvalidTokenErrorResponse(
    '유효하지 않은 토큰입니다.',
  );

  static ErrorAlreadyRegistered = new ApiAlreadyRegisteredErrorResponse(
    '이미 등록된 회원입니다.',
  );

  static ErrorNotFoundUser = new ApiNotFoundErrorResponse(
    '사용자를 찾을 수 없습니다.',
  );

  static ISS = 'boardrank.kr';
  static REFRESH_EXPIRES_IN = '30d';

  logger = new Logger('AuthService');

  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(idToken: string): Promise<ApiAuthResponse> {
    const payload = await verifyIdToken(idToken);

    if (!payload) {
      throw new BadRequestException(AuthService.ErrorInvalidToken);
    }

    const oauthId = payload.sub;
    const nickname = payload.name || '';
    const profileUrl = payload.picture || '';
    const role = Role.MEMBER;

    try {
      const user = await this.prismaService.user.create({
        data: { oauthId, nickname, profileUrl, role },
      });

      const [refreshToken, accessToken] = await Promise.all([
        this.issueRefreshToken(user.id),
        this.issueAccessToken(user),
      ]);

      return {
        refreshToken,
        accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async signIn(idToken: string): Promise<ApiAuthResponse> {
    const payload = await verifyIdToken(idToken);

    if (!payload) {
      throw new BadRequestException(AuthService.ErrorInvalidToken);
    }

    const user = await this.prismaService.user.findUnique({
      where: { oauthId: payload.sub },
    });

    if (!user) {
      throw new NotFoundException(AuthService.ErrorNotFoundUser);
    } else if (user.status === 'BLOCK') {
      throw new ForbiddenException(HttpExceptionFilter.ErrorBlockStatus);
    } else if (user.status === 'DORMANT') {
      throw new ForbiddenException(HttpExceptionFilter.ErrorDormantStatus);
    }

    const [refreshToken, accessToken] = await Promise.all([
      this.issueRefreshToken(user.id),
      this.issueAccessToken(user),
    ]);

    return {
      refreshToken,
      accessToken,
    };
  }

  async refresh(token: string): Promise<ApiAuthResponse> {
    try {
      return await this.issueTokensByRefreshToken(token);
    } catch (error) {
      throw error;
    }
  }

  async issueRefreshToken(id: number): Promise<string> {
    try {
      const payload: RefreshTokenPayloadDto = {
        iss: AuthService.ISS,
        aud: id,
      };
      return this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: AuthService.REFRESH_EXPIRES_IN,
      });
    } catch (error) {
      throw error;
    }
  }

  async issueAccessToken<T>({
    id,
    nickname,
    profileUrl,
  }: CreateAccessTokenDto<T>): Promise<string> {
    const payload: Partial<AccessTokenPayloadDto<T>> = {
      iss: AuthService.ISS,
      aud: id,
      nickname,
      profileUrl,
    };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  async issueTokensByRefreshToken(token: string): Promise<ApiAuthResponse> {
    try {
      const { aud: id } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(AuthService.ErrorNotFoundUser);
      } else if (user.status === 'BLOCK') {
        throw new ForbiddenException(HttpExceptionFilter.ErrorBlockStatus);
      } else if (user.status === 'DORMANT') {
        throw new ForbiddenException(HttpExceptionFilter.ErrorDormantStatus);
      }

      const [refreshToken, accessToken] = await Promise.all([
        this.issueRefreshToken(id),
        this.issueAccessToken(user),
      ]);

      return {
        refreshToken,
        accessToken,
      };
    } catch (error) {
      if (error.message === 'jwt must be provided') {
        throw new BadRequestException(AuthService.ErrorInvalidToken);
      }
      throw error;
    }
  }
}
