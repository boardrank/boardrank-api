import { Test, TestingModule } from '@nestjs/testing';
import { BoardGameScoreService } from './board-game-score.service';

describe('BoardGameScoreService', () => {
  let service: BoardGameScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardGameScoreService],
    }).compile();

    service = module.get<BoardGameScoreService>(BoardGameScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
