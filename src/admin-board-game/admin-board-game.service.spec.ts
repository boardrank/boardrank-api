import { Test, TestingModule } from '@nestjs/testing';
import { AdminBoardGameService } from './admin-board-game.service';

describe('AdminBoardGameService', () => {
  let service: AdminBoardGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminBoardGameService],
    }).compile();

    service = module.get<AdminBoardGameService>(AdminBoardGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
