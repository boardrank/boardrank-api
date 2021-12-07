import { AdminBoardGameController } from './admin-board-game.controller';
import { AdminBoardGameService } from './admin-board-game.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AdminBoardGameController],
  providers: [AdminBoardGameService, PrismaService],
})
export class AdminBoardGameModule {}
