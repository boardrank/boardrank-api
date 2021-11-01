import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

const GENRES = [
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
  logger = new Logger('GenreService');
  constructor(private prismaService: PrismaService) {
    this.initialize();
  }

  async initialize() {
    // 장르가 없을 경우 데이터 입력
    const genres = await this.findAll();
    if (genres.length === 0) {
      GENRES.forEach(async (data) => {
        const { code, name } = await this.prismaService.genre.create({ data });
        this.logger.log(`Initialized genre [${code}, ${name}] row.`);
      });
    }
  }

  create({ code, name }: CreateGenreDto) {
    return this.prismaService.genre.create({
      data: {
        code: code.toUpperCase(),
        name,
      },
    });
  }

  findAll() {
    return this.prismaService.genre.findMany();
  }

  update(id: number, { code, name }: UpdateGenreDto) {
    return this.prismaService.genre.update({
      data: {
        code: code?.toUpperCase(),
        name,
      },
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.genre.delete({
      where: { id },
    });
  }
}
