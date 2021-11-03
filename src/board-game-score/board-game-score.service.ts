import { ConflictException, Injectable } from '@nestjs/common';

import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { CreateBoardGameScoreDto } from './dto/create-board-game-score.dto';
import { ErrorCode } from 'libs/http-exceptions/error-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardGameScoreService {
  static ErrorAlreadyRegistered = new ApiErrorResponse(
    ErrorCode.AlreadyRegistered,
    '이미 점수를 등록했습니다.',
  );

  constructor(private prismaService: PrismaService) {}

  async create(
    userId: number,
    createBoardGameScoreDto: CreateBoardGameScoreDto,
  ) {
    try {
      const boardGameScore = await this.prismaService.boardGameScore.findFirst({
        where: {
          userId,
          boardGameId: createBoardGameScoreDto.boardGameId,
        },
      });

      if (boardGameScore) {
        throw new ConflictException({
          ...BoardGameScoreService.ErrorAlreadyRegistered,
          boardGameScore,
        });
      }

      return await this.prismaService.boardGameScore.create({
        data: { userId, ...createBoardGameScoreDto },
      });
    } catch (error) {
      throw error;
    }
  }
}
