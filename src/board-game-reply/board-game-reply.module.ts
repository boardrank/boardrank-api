import { BoardGameReplyController } from './board-game-reply.controller';
import { BoardGameReplyService } from './board-game-reply.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BoardGameReplyController],
  providers: [BoardGameReplyService, PrismaService],
})
export class BoardGameReplyModule {}
