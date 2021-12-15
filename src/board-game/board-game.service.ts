import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { ApiInvalidParamErrorResponse } from 'src/libs/http-exceptions/api-invalid-param-error-response';
import { ApiNotFoundErrorResponse } from 'src/libs/http-exceptions/api-not-found-error-response';
import { BoardGameDetail } from './vo/board-game-detail.vo';
import { BoardGameListItem } from './vo/board-game-list-item.vo';
import { Prisma } from '.prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';

@Injectable()
export class BoardGameService {
  static ErrorNotFoundBoardGame = new ApiNotFoundErrorResponse(
    '보드게임을 찾을 수 없습니다.',
  );

  static ErrorBadRequestGenreId = new ApiInvalidParamErrorResponse(
    '올바르지 않은 장르입니다.',
  );

  logger = new Logger('BoardGameService');

  constructor(private prismaService: PrismaService) {}

  async findAllByGenreId(genreId: number): Promise<BoardGameListItem[]> {
    try {
      const genre = this.prismaService.genre.findUnique({
        where: { id: genreId },
      });

      if (!genre) {
        throw new BadRequestException(BoardGameService.ErrorBadRequestGenreId);
      }

      const boardGames = await this.prismaService.boardGame.findMany({
        include: {
          boardGameGenres: {
            include: {
              genre: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                  order: true,
                },
              },
            },
          },
        },
        where: {
          boardGameGenres: {
            some: {
              genre: {
                id: genreId,
              },
            },
          },
        },
      });

      // [ { boardGameId: 1, _avg: { score: 8 } } ]
      const averageScores = {};
      (
        await this.prismaService.boardGameScore.groupBy({
          by: ['boardGameId'],
          _avg: {
            score: true,
          },
        })
      ).forEach(({ boardGameId, _avg: { score } }) => {
        averageScores[boardGameId] = score;
      });

      return boardGames.map(({ boardGameGenres, ...boardGame }) => {
        return {
          ...boardGame,
          genres: boardGameGenres.map(({ genre }) => genre),
          averageScore: averageScores[boardGame.id] || 0,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<BoardGameListItem[]> {
    try {
      const boardGames = await this.prismaService.boardGame.findMany({
        include: {
          boardGameGenres: {
            include: {
              genre: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                  order: true,
                },
              },
            },
          },
        },
      });

      // [ { boardGameId: 1, _avg: { score: 8 } } ]
      const averageScores = {};
      (
        await this.prismaService.boardGameScore.groupBy({
          by: ['boardGameId'],
          _avg: {
            score: true,
          },
        })
      ).forEach(({ boardGameId, _avg: { score } }) => {
        averageScores[boardGameId] = score;
      });

      return boardGames.map(({ boardGameGenres, ...boardGame }) => {
        return {
          ...boardGame,
          genres: boardGameGenres.map(({ genre }) => genre),
          averageScore: averageScores[boardGame.id] || 0,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number, userId?: number): Promise<BoardGameDetail> {
    try {
      const { boardGameGenres, boardGameScores, ...boardGame } =
        await this.prismaService.boardGame.findUnique({
          where: { id },
          include: {
            boardGameGenres: {
              include: {
                genre: {
                  select: {
                    id: true,
                    code: true,
                    name: true,
                    order: true,
                  },
                },
              },
            },
            boardGameScores: {
              select: {
                id: true,
                score: true,
                comment: true,
                userId: true,
                boardGameId: true,
                user: {
                  select: {
                    id: true,
                    nickname: true,
                    profileUrl: true,
                    role: true,
                  },
                },
              },
            },
          },
        });

      const genres = boardGameGenres.map(({ genre }) => genre);
      let myScore = 0;
      if (userId) {
        const { score } = await this.prismaService.boardGameScore.findFirst({
          select: {
            score: true,
          },
          where: {
            userId,
            boardGameId: id,
          },
        });
        myScore = score;
      }

      /**
       * Ranking
       */
      let averageScore = 0;
      const scoreAverages = await this.prismaService.boardGameScore.groupBy({
        by: ['boardGameId'],
        _avg: {
          score: true,
        },
        orderBy: {
          _avg: {
            score: 'desc',
          },
        },
      });

      let seq = 0;
      let prevScore = -1;
      let rank = 0;
      for (const {
        boardGameId,
        _avg: { score },
      } of scoreAverages) {
        seq++;
        if (prevScore !== score) {
          prevScore = score;
          rank = seq;
        }
        if (boardGameId === boardGame.id) {
          averageScore = score;
          break;
        }
      }
      if (averageScore === 0) rank = seq + 1;

      return {
        ...boardGame,
        genres,
        averageScore,
        rank,
        myScore,
        boardGameScores,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const [
        { count: genreCount },
        { count: gradeCount },
        { count: replyCount },
        { boardGameGenres, ...boardGame },
      ] = await this.prismaService.$transaction([
        this.prismaService.boardGameGenre.deleteMany({
          where: { boardGameId: id },
        }),
        this.prismaService.boardGameScore.deleteMany({
          where: { boardGameId: id },
        }),
        this.prismaService.boardGameReply.deleteMany({
          where: { boardGameId: id },
        }),
        this.prismaService.boardGame.delete({
          where: { id },
          include: { boardGameGenres: { include: { genre: true } } },
        }),
      ]);

      this.logger.log(
        `Deleted rows derived BoardGame id: ${id} genre: ${genreCount}, grade: ${gradeCount}, reply: ${replyCount}.`,
      );

      const genres = boardGameGenres.map(({ genre }) => genre);

      return { ...boardGame, genres };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          /**
           * 해당 id 보드게임이 없을 때
           */
          throw new NotFoundException(BoardGameService.ErrorNotFoundBoardGame);
        }
      }
      throw error;
    }
  }
}
