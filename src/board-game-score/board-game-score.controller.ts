import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request } from 'express';
import { SwaggerTag } from 'libs/constants';
import { Roles } from 'libs/decorators/role.decorator';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { RolesGuard } from 'libs/guards/roles.guard';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';
import { Role } from 'src/auth/entities/role';
import { BoardGameScoreService } from './board-game-score.service';
import { CreateBoardGameScoreDto } from './dto/create-board-game-score.dto';
import { BoardGameScore } from './entities/board-game-score.entity';

@ApiTags(SwaggerTag.BoardGameScore)
@ApiBearerAuth()
@Controller('board-game-score')
export class BoardGameScoreController {
  constructor(private readonly boardGameScoreService: BoardGameScoreService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(BoardGameScore) },
  })
  @ApiUnauthorizedResponse()
  async create(
    @Req() req: Request,
    @Body() createBoardGameScoreDto: CreateBoardGameScoreDto,
  ) {
    const { id } = req.user as UserByAccessToken;
    return await this.boardGameScoreService.create(id, createBoardGameScoreDto);
  }
}
