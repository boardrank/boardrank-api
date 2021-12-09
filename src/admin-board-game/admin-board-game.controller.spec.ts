import { Test, TestingModule } from '@nestjs/testing';

import { AdminBoardGameController } from './admin-board-game.controller';
import { AdminBoardGameModule } from './admin-board-game.module';

describe('AdminBoardGameController', () => {
  let controller: AdminBoardGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminBoardGameModule],
    }).compile();

    controller = module.get<AdminBoardGameController>(AdminBoardGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
