import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';

@Injectable()
export class BoardGameService {
  constructor(private prismaService: PrismaService) {}

  findAllByGenre(genreCodes: string[]) {
    this.prismaService.boardGame.findMany({
      where: {},
    });
    return [];
  }

  async create({ genreCodes, ...createBoardGameDto }: CreateBoardGameDto) {
    try {
      const genres = await this.prismaService.genre.findMany({
        where: {
          code: {
            in: genreCodes,
          },
        },
      });

      return await this.prismaService.boardGame.create({
        data: {
          ...createBoardGameDto,
          genres: {
            create: genres.map(({ id }) => ({ genreId: id })),
          },
        },
        include: {
          genres: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all boardGame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boardGame`;
  }

  update(id: number, updateBoardGameDto: UpdateBoardGameDto) {
    return `This action updates a #${id} boardGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} boardGame`;
  }
}
