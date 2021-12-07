import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { AdminBoardGameListItem } from './vo/admin-board-game-list-item.vo';
import { ApiInvalidParamErrorResponse } from 'libs/http-exceptions/api-invalid-param-error-response';
import { ApiNotFoundErrorResponse } from 'libs/http-exceptions/api-not-found-error-response';
import { BoardGame } from './vo/board-game.vo';
import { BoardGameService } from 'src/board-game/board-game.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';

@Injectable()
export class AdminBoardGameService {
  static ErrorNotFoundBoardGame = new ApiNotFoundErrorResponse(
    '보드게임을 찾을 수 없습니다.',
  );

  static ErrorBadRequestGenreId = new ApiInvalidParamErrorResponse(
    '올바르지 않은 장르입니다.',
  );

  logger = new Logger('AdminBoardGameService');

  constructor(private readonly prismaService: PrismaService) {}

  async create({
    genreIds,
    ...createBoardGameDto
  }: CreateBoardGameDto): Promise<BoardGame> {
    try {
      const { boardGameGenres, ...boardGame } =
        await this.prismaService.boardGame.create({
          select: {
            id: true,
            name: true,
            description: true,
            thumbnailUrl: true,
            designer: true,
            difficulty: true,
            personnel: true,
            recommendPersonnel: true,
            playTime: true,
            age: true,
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
          data: {
            ...createBoardGameDto,
            boardGameGenres: {
              create: genreIds.map((id) => ({ genreId: id })),
            },
          },
        });

      const genres = boardGameGenres.map(({ genre }) => genre);

      return { ...boardGame, genres };
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    rowsPerPage: number,
    page: number,
    keyword = '',
  ): Promise<AdminBoardGameListItem[]> {
    try {
      const boardGames = await this.prismaService.boardGame.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          thumbnailUrl: true,
          createdAt: true,
        },
        where: {
          OR: [
            { name: { contains: keyword } },
            { description: { contains: keyword } },
            { designer: { contains: keyword } },
          ],
        },
        skip: (page - 1) * rowsPerPage,
        take: rowsPerPage,
        orderBy: {
          id: 'desc',
        },
      });

      return boardGames;
    } catch (error) {
      throw error;
    }
  }

  async getAllCount(keyword = ''): Promise<number> {
    try {
      const { _count: count } = await this.prismaService.boardGame.aggregate({
        _count: true,
        where: {
          OR: [
            { name: { contains: keyword } },
            { description: { contains: keyword } },
            { designer: { contains: keyword } },
          ],
        },
      });

      return count;
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

      const { boardGameGenres, ...boardGame } =
        await this.prismaService.boardGame.update({
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
