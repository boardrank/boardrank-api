import { Test, TestingModule } from '@nestjs/testing';

import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './vo/genre.vo';
import { GenreController } from './genre.controller';
import { GenreModule } from './genre.module';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

describe('GenreController', () => {
  const prismaService = new PrismaService();
  let controller: GenreController;
  let createdTestGenre: Genre;

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

  describe('Genre CRUD', () => {
    const testGenre = new CreateGenreDto();
    testGenre.code = 'TEST_GENRE';
    testGenre.name = '테스트 장르';

    const removeTestGenres = async () => {
      try {
        const genres = await prismaService.genre.findMany({
          where: {
            OR: [{ code: 'TEST_GENRE' }, { code: 'UPDATE_TEST_GENRE' }],
          },
        });
        if (genres.length > 0) {
          for (const { id } of genres) {
            await prismaService.genre.delete({ where: { id } });
          }
        }
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            console.log(error.meta);
          }
        }
      }
    };

    beforeAll(removeTestGenres);

    it('should be created a genre', async () => {
      const testGenre = new CreateGenreDto();
      testGenre.code = 'TEST_GENRE';
      testGenre.name = '테스트 장르';

      const { genre } = await controller.create({ genre: testGenre });
      createdTestGenre = genre;

      expect(createdTestGenre.code).toBe(testGenre.code);
      expect(createdTestGenre.name).toBe(testGenre.name);
      expect(typeof createdTestGenre.order === 'number').toBeTruthy();
    });

    it('should be updated properties of createdTestGenre', async () => {
      createdTestGenre.code = 'UPDATE_TEST_GENRE';
      createdTestGenre.name = '수정된 테스트 장르';

      const { genre: updatedTestGenre } = await controller.update(
        `${createdTestGenre.id}`,
        {
          genre: {
            code: createdTestGenre.code,
            name: createdTestGenre.name,
          },
        },
      );

      expect(updatedTestGenre.code).toBe(createdTestGenre.code);
      expect(updatedTestGenre.name).toBe(createdTestGenre.name);
    });

    it('should be deleted', async () => {
      const { genre: deletedGenre } = await controller.remove(
        `${createdTestGenre.id}`,
      );
      const genre = await prismaService.genre.findUnique({
        where: { id: createdTestGenre.id },
      });
      expect(deletedGenre.id).toEqual(createdTestGenre.id);
      expect(genre).toBeNull();
    });

    afterAll(removeTestGenres);
  });
});
