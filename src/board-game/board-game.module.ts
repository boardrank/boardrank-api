import { Module } from '@nestjs/common';
import { BoardGameService } from './board-game.service';
import { BoardGameController } from './board-game.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BoardGameController],
  providers: [BoardGameService, PrismaService],
})
export class BoardGameModule {}
