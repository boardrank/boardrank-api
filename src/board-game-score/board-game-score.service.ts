import { ConflictException, Injectable } from '@nestjs/common';

import { ApiAlreadyRegisteredErrorResponse } from 'libs/http-exceptions/api-has-reference-error-response';
import { CreateBoardGameScoreDto } from './dto/create-board-game-score.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardGameScoreService {
  static ErrorAlreadyRegistered = new ApiAlreadyRegisteredErrorResponse(
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

  async getAverageScoreById(boardGameId: number) {
    try {
      const {
        _avg: { score },
      } = await this.prismaService.boardGameScore.aggregate({
        _avg: {
          score: true,
        },
        where: {
          boardGameId,
        },
      });

      return score;
    } catch (error) {
      throw error;
    }
  }
}
