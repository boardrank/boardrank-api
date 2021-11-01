import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { ApiErrorResponse } from '../../libs/http-exceptions/api-error-response';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ErrorCode } from '../../libs/http-exceptions/error-codes';
import { PrismaService } from '../../src/prisma/prisma.service';
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
    code = code.toUpperCase();
    /**
     * 코드가 중복되었을 때 Conflict Exception
     */
    if (await this.prismaService.genre.findFirst({ where: { code } })) {
      throw new ConflictException(GenreService.ErrorAlreadyRegistered);
    }

    const genre = await this.prismaService.genre.findFirst({
      select: {
        order: true,
      },
      orderBy: {
        order: 'desc',
      },
    });

    return this.prismaService.genre.create({
      data: {
        code: code.toUpperCase(),
        name,
        order: genre?.order + 1 || 1,
      },
    });
  }

  findAll() {
    return this.prismaService.genre.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async update(id: number, { code, name, order }: UpdateGenreDto) {
    code = code?.toUpperCase();
    const genre = await this.prismaService.genre.findFirst({ where: { id } });
    /**
     * 해당 id의 장르가 없을 때
     */
    if (!genre) {
      throw new NotFoundException(GenreService.ErrorNotFound);
    }
    /**
     * 다른 장르와 코드가 중복되었을 때 Conflict Exception
     */
    if (
      code &&
      (await this.prismaService.genre.findFirst({
        where: { AND: { code }, NOT: { id } },
      }))
    ) {
      throw new ConflictException(GenreService.ErrorAlreadyRegistered);
    }

    return this.prismaService.genre.update({
      data: {
        code,
        name,
        order,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    const genre = await this.prismaService.genre.findFirst({ where: { id } });
    /**
     * 해당 id의 장르가 없을 때
     */
    if (!genre) {
      throw new NotFoundException(GenreService.ErrorNotFound);
    }

    return this.prismaService.genre.delete({
      where: { id },
    });
  }
}
