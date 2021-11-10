import { Test, TestingModule } from '@nestjs/testing';

import { BoardGameScoreController } from './board-game-score.controller';
import { BoardGameScoreModule } from './board-game-score.module';

describe('BoardGameScoreController', () => {
  let controller: BoardGameScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BoardGameScoreModule],
    }).compile();

    controller = module.get<BoardGameScoreController>(BoardGameScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
