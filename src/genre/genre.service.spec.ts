import { Test, TestingModule } from '@nestjs/testing';

import { Genre } from './vo/genre.vo';
import { GenreService } from './genre.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('GenreService', () => {
  let service: GenreService;
  let genres: Genre[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [GenreService, PrismaService],
    }).compile();

    service = module.get<GenreService>(GenreService);
    genres = await service.findAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
