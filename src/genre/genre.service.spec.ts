import { Test, TestingModule } from '@nestjs/testing';

import { GenreService } from './genre.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('GenreService', () => {
  let service: GenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [GenreService, PrismaService],
    }).compile();

    service = module.get<GenreService>(GenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
