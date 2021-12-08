import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenreService {
  constructor(private prismaService: PrismaService) {}

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
}
