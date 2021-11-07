import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ApiAlreadyRegisteredErrorResponse } from 'libs/http-exceptions/api-has-reference-error-response';
import { ApiHasReferenceErrorResponse } from 'libs/http-exceptions/api-already-registered-error-response';
import { ApiNotFoundErrorResponse } from 'libs/http-exceptions/api-not-found-error-response';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  static ErrorAlreadyRegistered = new ApiAlreadyRegisteredErrorResponse(
    '이미 등록된 장르 코드입니다.',
  );

  static ErrorNotFound = new ApiNotFoundErrorResponse(
    '해당 장르를 찾을 수 없습니다.',
  );

  static ErrorHasReference = new ApiHasReferenceErrorResponse(
    '해당 장르를 참조하는 보드게임이 있습니다.',
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
        if (error.code === 'P2003') {
          /**
           * 해당 장르를 참조하는 보드게임이 있을 경우
           */
          throw new ConflictException(GenreService.ErrorHasReference);
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
}
