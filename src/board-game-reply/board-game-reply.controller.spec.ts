import { Test, TestingModule } from '@nestjs/testing';
import { BoardGameReplyController } from './board-game-reply.controller';
import { BoardGameReplyService } from './board-game-reply.service';

describe('BoardGameReplyController', () => {
  let controller: BoardGameReplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardGameReplyController],
      providers: [BoardGameReplyService],
    }).compile();

    controller = module.get<BoardGameReplyController>(BoardGameReplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
