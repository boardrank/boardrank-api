import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ApiAlreadyRegisteredErrorResponse } from 'libs/http-exceptions/api-has-reference-error-response';
import { ApiHasReferenceErrorResponse } from 'libs/http-exceptions/api-already-registered-error-response';
import { ApiInvalidDataErrorResponse } from 'libs/http-exceptions/api-invalid-data-error-response';
import { ApiNotFoundErrorResponse } from 'libs/http-exceptions/api-not-found-error-response';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './vo/genre.vo';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class AdminGenreService {
  static ErrorAlreadyRegistered = new ApiAlreadyRegisteredErrorResponse(
    '이미 등록된 장르 코드입니다.',
  );

  static ErrorNotFound = new ApiNotFoundErrorResponse(
    '해당 장르를 찾을 수 없습니다.',
  );

  static ErrorHasReference = new ApiHasReferenceErrorResponse(
    '해당 장르를 참조하는 보드게임이 있습니다.',
  );

  static ErrorInvalidOrderData = new ApiInvalidDataErrorResponse(
    'order 값이 올바르지 않습니다',
  );

  constructor(private prismaService: PrismaService) {}

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
        select: {
          id: true,
          code: true,
          name: true,
          order: true,
        },
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
          throw new ConflictException(AdminGenreService.ErrorAlreadyRegistered);
        }
      }

      throw error;
    }
  }

  findAll() {
    return this.prismaService.genre.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        order: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async update(id: number, { code, name }: UpdateGenreDto) {
    try {
      return await this.prismaService.genre.update({
        select: {
          id: true,
          code: true,
          name: true,
          order: true,
        },
        data: {
          code: code?.toUpperCase(),
          name,
        },
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          /**
           * 다른 장르와 코드가 중복되었을 때 Conflict Exception
           */
          throw new ConflictException(AdminGenreService.ErrorAlreadyRegistered);
        } else if (error.code === 'P2025') {
          /**
           * 해당 id의 장르가 없을 때
           */
          throw new NotFoundException(AdminGenreService.ErrorNotFound);
        }
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.genre.delete({
        select: {
          id: true,
          code: true,
          name: true,
          order: true,
        },
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          /**
           * 해당 장르를 참조하는 보드게임이 있을 경우
           */
          throw new ConflictException(AdminGenreService.ErrorHasReference);
        } else if (error.code === 'P2025') {
          /**
           * 해당 id의 장르가 없을 때
           */
          throw new NotFoundException(AdminGenreService.ErrorNotFound);
        }
      }
      throw error;
    }
  }

  async rearrange(
    id: number,
    source: number,
    destination: number,
  ): Promise<Genre[]> {
    try {
      if (source === destination) return await this.findAll();
      const genres = await this.prismaService.genre.findMany({
        select: {
          id: true,
          order: true,
        },
        where: {
          order: {
            gte: Math.min(source, destination),
            lte: Math.max(source, destination),
          },
        },
        orderBy: {
          order: 'asc',
        },
      });

      if (!genres.some((genre) => genre.id === id && genre.order === source)) {
        throw new BadRequestException(AdminGenreService.ErrorInvalidOrderData);
      }

      if (source < destination) {
        genres.push(genres.shift());
      } else {
        genres.unshift(genres.pop());
      }

      let order = Math.min(source, destination);
      await this.prismaService.$transaction(
        genres.map((genre) => {
          return this.prismaService.genre.update({
            data: {
              order: order++,
            },
            where: {
              id: genre.id,
            },
          });
        }),
      );

      return await this.findAll();
    } catch (error) {
      throw error;
    }
  }
}
