import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';

@Module({
  controllers: [GenreController],
  providers: [GenreService, PrismaService],
})
export class GenreModule {}
