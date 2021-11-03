import { BoardGameScoreController } from './board-game-score.controller';
import { BoardGameScoreService } from './board-game-score.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BoardGameScoreController],
  providers: [BoardGameScoreService, PrismaService],
})
export class BoardGameScoreModule {}
