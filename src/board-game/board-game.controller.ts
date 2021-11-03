import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SwaggerTag } from 'libs/constants';
import { ApiForbiddenResponse } from 'libs/decorators/api-forbidden-response.decorator';
import { ApiUnauthorizedResponse } from 'libs/decorators/api-unauthorized-response.decorator';
import { Roles } from 'libs/decorators/role.decorator';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { RolesGuard } from 'libs/guards/roles.guard';
import { Role } from 'src/auth/entities/role';
import { BoardGameService } from './board-game.service';
import { CreateBoardGameDto } from './dto/create-board-game.dto';
import { UpdateBoardGameDto } from './dto/update-board-game.dto';
import { BoardGame } from './entities/board-game.entity';

@ApiTags(SwaggerTag.BoardGame)
@ApiBearerAuth()
@Controller('board-game')
export class BoardGameController {
  constructor(private readonly boardGameService: BoardGameService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(BoardGame) },
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async create(@Body() createBoardGameDto: CreateBoardGameDto) {
    return await this.boardGameService.create(createBoardGameDto);
  }

  @Get('/list')
  @ApiOkResponse({
    schema: { type: 'array', items: { $ref: getSchemaPath(BoardGame) } },
  })
  async findAll() {
    return await this.boardGameService.findAll();
  }

  @Get('/list/:genreId')
  @ApiOkResponse({
    schema: { type: 'array', items: { $ref: getSchemaPath(BoardGame) } },
  })
  @ApiBadRequestResponse({
    description: BoardGameService.ErrorBadRequestGenreId.toDescription(),
  })
  async findAllByGenreId(@Param('genreId') genreId: string) {
    return await this.boardGameService.findAllByGenreId(+genreId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(BoardGame) },
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse({
    description: BoardGameService.ErrorNotFoundBoardGame.toDescription(),
  })
  update(
    @Param('id') id: string,
    @Body() updateBoardGameDto: UpdateBoardGameDto,
  ) {
    return this.boardGameService.update(+id, updateBoardGameDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(BoardGame) },
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse({
    description: BoardGameService.ErrorNotFoundBoardGame.toDescription(),
  })
  remove(@Param('id') id: string) {
    return this.boardGameService.remove(+id);
  }
}
