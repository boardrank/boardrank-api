import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { CreateBoardGameReplyDto } from './dto/create-board-game-reply.dto';
import { ErrorCode } from 'libs/http-exceptions/error-codes';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/auth/entities/role';
import { UpdateBoardGameReplyDto } from './dto/update-board-game-reply.dto';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';

@Injectable()
export class BoardGameReplyService {
  static ErrorNotFoundBoardGame = new ApiErrorResponse(
    ErrorCode.NotFound,
    '댓글을 찾을 수 없습니다.',
  );

  constructor(private prismaService: PrismaService) {}

  async create(
    userId: number,
    createBoardGameReplyDto: CreateBoardGameReplyDto,
  ) {
    try {
      return await this.prismaService.boardGameReply.create({
        data: {
          ...createBoardGameReplyDto,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    userId: number,
    updateBoardGameReplyDto: UpdateBoardGameReplyDto,
  ) {
    try {
      const boardGameReply = await this.prismaService.boardGameReply.findUnique(
        { where: { id } },
      );

      if (boardGameReply && boardGameReply.userId !== userId) {
        throw new ForbiddenException();
      }

      return await this.prismaService.boardGameReply.update({
        data: updateBoardGameReplyDto,
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
        if (error.code === 'P2025') {
          throw new NotFoundException(
            BoardGameReplyService.ErrorNotFoundBoardGame,
          );
        }
      }
      throw error;
    }
  }

  async remove(id: number, user: UserByAccessToken) {
    try {
      if (user.role === Role.MEMBER) {
        const boardGameReply =
          await this.prismaService.boardGameReply.findFirst({
            where: { id },
          });

        if (boardGameReply && boardGameReply.userId !== user.id) {
          throw new ForbiddenException();
        }
      }

      return await this.prismaService.boardGameReply.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            BoardGameReplyService.ErrorNotFoundBoardGame,
          );
        }
      }
      throw error;
    }
  }
}
