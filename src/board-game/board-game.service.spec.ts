import { Test, TestingModule } from '@nestjs/testing';
import { BoardGameService } from './board-game.service';

describe('BoardGameService', () => {
  let service: BoardGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardGameService],
    }).compile();

    service = module.get<BoardGameService>(BoardGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
