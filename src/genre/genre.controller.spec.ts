import { Test, TestingModule } from '@nestjs/testing';

import { GenreController } from './genre.controller';
import { GenreModule } from './genre.module';

describe('GenreController', () => {
  let controller: GenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GenreModule],
    }).compile();

    controller = module.get<GenreController>(GenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be returned genre list', async () => {
    const { genres } = await controller.findAll();
    expect(genres.length > 0).toBeTruthy();
  });
});
