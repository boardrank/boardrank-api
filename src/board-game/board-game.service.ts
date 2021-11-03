import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { BoardGame } from './entities/board-game.entity';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { ErrorCode } from 'libs/http-exceptions/error-codes';
import { Prisma } from '.prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';

@Injectable()
export class BoardGameService {
  static ErrorNotFoundBoardGame = new ApiErrorResponse(
    ErrorCode.NotFound,
    '보드게임을 찾을 수 없습니다.',
  );

  static ErrorBadRequestGenreId = new ApiErrorResponse(
    ErrorCode.InvalidParam,
    '올바르지 않은 장르입니다.',
  );

  logger = new Logger('BoardGameService');

  constructor(private prismaService: PrismaService) {}

  async create({ genreIds, ...createBoardGameDto }: CreateBoardGameDto) {
    try {
      return await this.prismaService.boardGame.create({
        data: {
          ...createBoardGameDto,
          boardGameGenres: {
            create: genreIds.map((id) => ({ genreId: id })),
          },
        },
        include: {
          boardGameGenres: {
            include: {
              genre: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllByGenreId(genreId: number) {
    try {
      const genre = this.prismaService.genre.findUnique({
        where: { id: genreId },
      });

      if (!genre) {
        throw new BadRequestException(BoardGameService.ErrorBadRequestGenreId);
      }

      return await this.prismaService.boardGame.findMany({
        include: {
          boardGameGenres: {
            include: {
              genre: true,
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
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.boardGame.findMany({
        include: {
          boardGameGenres: {
            include: {
              genre: true,
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
    { genreIds, ...updateBoardGameDto }: UpdateBoardGameDto,
  ): Promise<BoardGame> {
    let genreIdsToBeCreated: number[] = [];
    let boardGameGenreidsToBeDeleted: number[] = [];

    try {
      if (genreIds) {
        const boardGameGenres =
          await this.prismaService.boardGameGenre.findMany({
            select: {
              id: true,
              genreId: true,
            },
            where: {
              boardGameId: id,
            },
          });

        genreIdsToBeCreated = genreIds.filter(
          (genreId) =>
            !boardGameGenres.some(
              (boardGAmeGenre) => boardGAmeGenre.genreId === genreId,
            ),
        );
        boardGameGenreidsToBeDeleted = boardGameGenres
          .filter(
            (boardGameGenre) => !genreIds.includes(boardGameGenre.genreId),
          )
          .map(({ id }) => id);
      }

      return await this.prismaService.boardGame.update({
        data: {
          ...updateBoardGameDto,
          boardGameGenres: {
            create: genreIdsToBeCreated.map((genreId) => ({ genreId })),
            delete: boardGameGenreidsToBeDeleted.map((id) => ({ id })),
          },
        },
        where: { id },
        include: {
          boardGameGenres: {
            include: {
              genre: true,
            },
          },
        },
      });
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

  async remove(id: number) {
    try {
      const [
        { count: genreCount },
        { count: gradeCount },
        { count: replyCount },
        boardGame,
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
        this.prismaService.boardGame.delete({ where: { id } }),
      ]);

      this.logger.log(
        `Deleted rows derived BoardGame id: ${id} genre: ${genreCount}, grade: ${gradeCount}, reply: ${replyCount}.`,
      );

      return boardGame;
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
