import { Test, TestingModule } from '@nestjs/testing';

import { BoardGameReplyController } from './board-game-reply.controller';
import { BoardGameReplyModule } from './board-game-reply.module';

describe('BoardGameReplyController', () => {
  let controller: BoardGameReplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BoardGameReplyModule],
    }).compile();

    controller = module.get<BoardGameReplyController>(BoardGameReplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
