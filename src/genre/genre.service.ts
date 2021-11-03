import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ErrorCode } from 'libs/http-exceptions/error-codes';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGenreDto } from './dto/update-genre.dto';

export const GENRES = [
  { code: 'STRATEGY', name: '전략' },
  { code: 'ABSTRACT', name: '추상' },
  { code: 'WITS', name: '순발력' },
  { code: 'BATTLE', name: '전투' },
  { code: 'REASONING', name: '추리' },
  { code: 'CARD', name: '카드게임' },
  { code: 'TILE', name: '타일' },
  { code: 'THEME', name: '테마' },
];

@Injectable()
export class GenreService {
  static ErrorAlreadyRegistered = new ApiErrorResponse(
    ErrorCode.AlreadyRegistered,
    '이미 등록된 장르 코드입니다.',
  );

  static ErrorNotFound = new ApiErrorResponse(
    ErrorCode.NotFound,
    '해당 장르를 찾을 수 없습니다.',
  );

  static ErrorHasReference = new ApiErrorResponse(
    ErrorCode.HasReference,
    '해당 장르를 참조하는 보드게임이 있습니다.',
  );

  logger = new Logger('GenreService');
  constructor(private prismaService: PrismaService) {
    this.initialize();
  }

  async initialize() {
    // 장르가 없을 경우 데이터 입력
    const genres = await this.findAll();
    if (genres.length === 0) {
      for (let i = 0; i < GENRES.length; i++) {
        const { code, name } = await this.create(GENRES[i]);
        this.logger.log(`Initialized genre [${code}, ${name}] row.`);
      }
    }
  }

  async create({ code, name }: CreateGenreDto) {
    try {
      const genre = await this.prismaService.genre.findFirst({
        select: {
          order: true,
        },
        orderBy: {
          order: 'desc',
        },
      });

      return await this.prismaService.genre.create({
        data: {
          code: code.toUpperCase(),
          name,
          order: genre?.order + 1 || 1,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          /**
           * 코드가 중복되었을 때 Conflict Exception
           */
          throw new ConflictException(GenreService.ErrorAlreadyRegistered);
        }
      }

      throw error;
    }
  }

  findAll() {
    return this.prismaService.genre.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async update(id: number, { code, name, order }: UpdateGenreDto) {
    try {
      return await this.prismaService.genre.update({
        data: {
          code: code?.toUpperCase(),
          name,
          order,
        },
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          /**
           * 다른 장르와 코드가 중복되었을 때 Conflict Exception
           */
          throw new ConflictException(GenreService.ErrorAlreadyRegistered);
        } else if (error.code === 'P2025') {
          /**
           * 해당 id의 장르가 없을 때
           */
          throw new NotFoundException(GenreService.ErrorNotFound);
        }
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.genre.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          /**
           * 해당 id의 장르가 없을 때
           */
          throw new NotFoundException(GenreService.ErrorNotFound);
        } else if (error.code === 'P2003') {
          /**
           * 해당 장르를 참조하는 보드게임이 있을 경우
           */
          throw new ConflictException(GenreService.ErrorHasReference);
        }
      }
      throw error;
    }
  }
}
