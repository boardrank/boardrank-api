import { Injectable, NotFoundException } from '@nestjs/common';

import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { ErrorCode } from 'libs/http-exceptions/error-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  static ErrorNotFound = new ApiErrorResponse(
    ErrorCode.NotFound,
    '해당 유저를 찾을 수 없습니다.',
  );

  constructor(private prismaService: PrismaService) {}

  async findOneById(id: number) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(UserService.ErrorNotFound);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
