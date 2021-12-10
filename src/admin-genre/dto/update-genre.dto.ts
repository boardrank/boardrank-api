import { CreateGenreDto } from './create-genre.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
