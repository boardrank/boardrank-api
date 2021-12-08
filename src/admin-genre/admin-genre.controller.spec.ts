import { Test, TestingModule } from '@nestjs/testing';
import { AdminGenreController } from './admin-genre.controller';
import { AdminGenreService } from './admin-genre.service';

describe('AdminGenreController', () => {
  let controller: AdminGenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminGenreController],
      providers: [AdminGenreService],
    }).compile();

    controller = module.get<AdminGenreController>(AdminGenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
