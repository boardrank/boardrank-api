import { Test, TestingModule } from '@nestjs/testing';

import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';
import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('GenreService', () => {
  let service: GenreService;
  let genres: Genre[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [GenreService, PrismaService],
    }).compile();

    service = module.get<GenreService>(GenreService);
    service.initialize();
    genres = await service.findAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be caused by an conflict exception when create using duplicated code', async () => {
    try {
      await service.create(genres[0]);
    } catch (error) {
      if (error.response) {
        expect(error.status).toBe(HttpStatus.CONFLICT);
        expect(error.response).toEqual(GenreService.ErrorAlreadyRegistered);
      }
    }
  });

  it('should be caused by an conflict exception when update using duplicated code', async () => {
    try {
      await service.update(genres[0].id, genres[1]);
    } catch (error) {
      if (error.response) {
        expect(error.status).toBe(HttpStatus.CONFLICT);
        expect(error.response).toEqual(GenreService.ErrorAlreadyRegistered);
      }
    }
  });

  it('should be caused by an not found exception when update using invalid id', async () => {
    try {
      await service.update(0, genres[0]);
    } catch (error) {
      if (error.response) {
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.response).toEqual(GenreService.ErrorNotFound);
      }
    }
  });

  it('should be caused by an not found exception when remove using invalid id', async () => {
    try {
      await service.remove(0);
    } catch (error) {
      if (error.response) {
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.response).toEqual(GenreService.ErrorNotFound);
      }
    }
  });
});
