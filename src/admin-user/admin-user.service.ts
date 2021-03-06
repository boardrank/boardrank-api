import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminUser } from './vo/admin-user.vo';
import { ApiAlreadyRegisteredErrorResponse } from 'src/libs/http-exceptions/api-has-reference-error-response';
import { ApiNotFoundErrorResponse } from 'src/libs/http-exceptions/api-not-found-error-response';
import { Prisma } from 'prisma/prisma-client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserListItem } from './vo/user-list-item.vo';

@Injectable()
export class AdminUserService {
  static ErrorAlreadyRegistered = new ApiAlreadyRegisteredErrorResponse(
    '이미 등록된 회원입니다.',
  );

  static ErrorNotFound = new ApiNotFoundErrorResponse(
    '해당 유저를 찾을 수 없습니다.',
  );

  constructor(private prismaService: PrismaService) {}

  async findAllByPageAndRowsPerPage(
    page: number,
    rowsPerPage: number,
    keyword = '',
  ): Promise<UserListItem[]> {
    try {
      const users = await this.prismaService.user.findMany({
        select: {
          id: true,
          nickname: true,
          profileUrl: true,
          role: true,
          status: true,
          createdAt: true,
        },
        where: {
          nickname: {
            contains: keyword,
          },
        },
        skip: (page - 1) * rowsPerPage,
        take: rowsPerPage,
        orderBy: {
          id: 'desc',
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async getAllCount(keyword = ''): Promise<number> {
    try {
      const { _count } = await this.prismaService.user.aggregate({
        _count: true,
        where: {
          nickname: {
            contains: keyword,
          },
        },
      });
      return _count;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<AdminUser> {
    try {
      return await this.prismaService.user.update({
        select: {
          id: true,
          nickname: true,
          profileUrl: true,
          role: true,
          status: true,
          createdAt: true,
        },
        data: updateUserDto,
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(AdminUserService.ErrorNotFound);
      }
      throw error;
    }
  }

  async delete(id: number): Promise<AdminUser> {
    try {
      return await this.prismaService.user.update({
        select: {
          id: true,
          nickname: true,
          profileUrl: true,
          role: true,
          status: true,
          createdAt: true,
        },
        data: {
          oauthId: null,
          status: 'WITHDRAWAL',
        },
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(AdminUserService.ErrorNotFound);
      }
      throw error;
    }
  }
}
