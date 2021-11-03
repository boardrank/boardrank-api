import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { ErrorCode } from 'libs/http-exceptions/error-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  async updateProfile(id: number, profile: UpdateProfileDto) {
    try {
      return await this.prismaService.user.update({
        data: profile,
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(UserService.ErrorNotFound);
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(UserService.ErrorNotFound);
      }
      throw error;
    }
  }
}
