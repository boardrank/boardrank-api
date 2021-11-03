import { Prisma } from '.prisma/client';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { ErrorCode } from 'libs/http-exceptions/error-codes';
import { Role } from 'src/auth/entities/role';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  static ErrorAlreadyRegistered = new ApiErrorResponse(
    ErrorCode.AlreadyRegistered,
    '이미 등록된 회원입니다.',
  );

  static ErrorNotFound = new ApiErrorResponse(
    ErrorCode.NotFound,
    '해당 유저를 찾을 수 없습니다.',
  );

  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          /**
           * oauth id가 중복되었을 경우
           */
          throw new ConflictException(UserService.ErrorAlreadyRegistered);
        }
      }
    }
  }

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

  async updateProfile(
    id: number,
    updateUserDto: UpdateUserDto,
    hasAdminPermission = false,
  ) {
    try {
      if (!hasAdminPermission && updateUserDto.role === Role.ADMIN) {
        throw new ForbiddenException();
      }

      return await this.prismaService.user.update({
        data: updateUserDto,
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
