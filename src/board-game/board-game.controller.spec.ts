import { Test, TestingModule } from '@nestjs/testing';
import { BoardGameController } from './board-game.controller';
import { BoardGameService } from './board-game.service';

describe('BoardGameController', () => {
  let controller: BoardGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardGameController],
      providers: [BoardGameService],
    }).compile();

    controller = module.get<BoardGameController>(BoardGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
