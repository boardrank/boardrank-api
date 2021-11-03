import { Module } from '@nestjs/common';
import { BoardGameReplyService } from './board-game-reply.service';
import { BoardGameReplyController } from './board-game-reply.controller';

@Module({
  controllers: [BoardGameReplyController],
  providers: [BoardGameReplyService]
})
export class BoardGameReplyModule {}
