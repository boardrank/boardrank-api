import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ApiNotFoundErrorResponse } from 'src/libs/http-exceptions/api-not-found-error-response';
import { BoardGameReply } from './vo/board-game-reply.vo';
import { CreateBoardGameReplyDto } from './dto/create-board-game-reply.dto';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBoardGameReplyDto } from './dto/update-board-game-reply.dto';
import { ApiNoPermissionErrorResponse } from 'src/libs/http-exceptions/api-no-permission-error-response';

@Injectable()
export class BoardGameReplyService {
  static ErrorNotFoundBoardGame = new ApiNotFoundErrorResponse(
    '댓글을 찾을 수 없습니다.',
  );

  static ErrorNoPermission = new ApiNoPermissionErrorResponse(
    '접근 권한이 없습니다.',
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
              role: true,
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
        throw new ForbiddenException(BoardGameReplyService.ErrorNoPermission);
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
              role: true,
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

  async remove(id: number, userId: number): Promise<BoardGameReply> {
    try {
      const boardGameReply = await this.prismaService.boardGameReply.findUnique(
        { where: { id } },
      );

      if (boardGameReply && boardGameReply.userId !== userId) {
        throw new ForbiddenException(BoardGameReplyService.ErrorNoPermission);
      }

      return await this.prismaService.boardGameReply.delete({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              profileUrl: true,
              role: true,
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
