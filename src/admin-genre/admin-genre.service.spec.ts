import { Test, TestingModule } from '@nestjs/testing';
import { AdminGenreService } from './admin-genre.service';

describe('AdminGenreService', () => {
  let service: AdminGenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminGenreService],
    }).compile();

    service = module.get<AdminGenreService>(AdminGenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
