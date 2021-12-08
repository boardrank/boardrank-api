import { AdminGenreController } from './admin-genre.controller';
import { AdminGenreService } from './admin-genre.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AdminGenreController],
  providers: [AdminGenreService, PrismaService],
})
export class AdminGenreModule {}
