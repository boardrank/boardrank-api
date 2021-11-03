import { Test, TestingModule } from '@nestjs/testing';
import { BoardGameScoreController } from './board-game-score.controller';
import { BoardGameScoreService } from './board-game-score.service';

describe('BoardGameScoreController', () => {
  let controller: BoardGameScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardGameScoreController],
      providers: [BoardGameScoreService],
    }).compile();

    controller = module.get<BoardGameScoreController>(BoardGameScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
