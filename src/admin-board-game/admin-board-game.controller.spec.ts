import { Test, TestingModule } from '@nestjs/testing';
import { AdminBoardGameController } from './admin-board-game.controller';

describe('AdminBoardGameController', () => {
  let controller: AdminBoardGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminBoardGameController],
    }).compile();

    controller = module.get<AdminBoardGameController>(AdminBoardGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
