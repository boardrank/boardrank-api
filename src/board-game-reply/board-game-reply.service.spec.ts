import { Test, TestingModule } from '@nestjs/testing';

import { BoardGameReplyModule } from './board-game-reply.module';
import { BoardGameReplyService } from './board-game-reply.service';

describe('BoardGameReplyService', () => {
  let service: BoardGameReplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BoardGameReplyModule],
    }).compile();

    service = module.get<BoardGameReplyService>(BoardGameReplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
