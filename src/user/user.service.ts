import { Injectable, NotFoundException } from '@nestjs/common';

import { ApiNotFoundErrorResponse } from 'src/libs/http-exceptions/api-not-found-error-response';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './vo/user.vo';
import { UploadFileService } from 'src/upload-file/upload-file.service';

@Injectable()
export class UserService {
  static ErrorNotFound = new ApiNotFoundErrorResponse(
    '해당 유저를 찾을 수 없습니다.',
  );

  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadFileService: UploadFileService,
  ) {}

  async findOneById(id: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        select: {
          id: true,
          nickname: true,
          profileUrl: true,
          role: true,
        },
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
    file?: Express.Multer.File,
  ): Promise<User> {
    try {
      if (file) {
        updateUserDto.profileUrl = await this.uploadFileService.uploadProfile(
          file,
        );
      }

      return await this.prismaService.user.update({
        select: {
          id: true,
          nickname: true,
          profileUrl: true,
          role: true,
        },
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
}
