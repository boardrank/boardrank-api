import { Test, TestingModule } from '@nestjs/testing';

import { BoardGameService } from './board-game.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('BoardGameService', () => {
  let service: BoardGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [BoardGameService, PrismaService],
    }).compile();

    service = module.get<BoardGameService>(BoardGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
