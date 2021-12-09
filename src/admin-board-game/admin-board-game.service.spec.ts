import { Test, TestingModule } from '@nestjs/testing';

import { AdminBoardGameService } from './admin-board-game.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AdminBoardGameService', () => {
  let service: AdminBoardGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [AdminBoardGameService, PrismaService],
    }).compile();

    service = module.get<AdminBoardGameService>(AdminBoardGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
