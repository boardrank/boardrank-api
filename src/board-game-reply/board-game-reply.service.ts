import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ApiNotFoundErrorResponse } from 'libs/http-exceptions/api-not-found-error-response';
import { BoardGameReply } from './vo/board-game-reply.vo';
import { CreateBoardGameReplyDto } from './dto/create-board-game-reply.dto';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/auth/entities/role';
import { UpdateBoardGameReplyDto } from './dto/update-board-game-reply.dto';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';

@Injectable()
export class BoardGameReplyService {
  static ErrorNotFoundBoardGame = new ApiNotFoundErrorResponse(
    '댓글을 찾을 수 없습니다.',
  );

  constructor(private prismaService: PrismaService) {}

  async create(
    userId: number,
    createBoardGameReplyDto: CreateBoardGameReplyDto,
  ): Promise<BoardGameReply> {
    try {
      return await this.prismaService.boardGameReply.create({
        data: {
          ...createBoardGameReplyDto,
          userId,
        },
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              profileUrl: true,
            },
          },
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
  ): Promise<BoardGameReply> {
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
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              profileUrl: true,
            },
          },
        },
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

  async remove(id: number, user: UserByAccessToken): Promise<BoardGameReply> {
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
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              profileUrl: true,
            },
          },
        },
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
