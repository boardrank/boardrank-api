import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';

@Injectable()
export class BoardGameService {
  constructor(private prisma: PrismaService) {}

  findAllByGenre(genre: string) {
    this.prisma.boardGame.findMany({
      where: {},
    });
    return [];
  }

  create(createBoardGameDto: CreateBoardGameDto) {
    return 'This action adds a new boardGame';
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
