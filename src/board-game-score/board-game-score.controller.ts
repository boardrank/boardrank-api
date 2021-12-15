import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request } from 'express';
import { SwaggerTag } from 'src/libs/constants';
import { ApiExpiredTokenResponse } from 'src/libs/decorators/api-expired-token-response.decorator';
import { Roles } from 'src/libs/decorators/role.decorator';
import { JwtAuthGuard } from 'src/libs/guards/jwt-auth.guard';
import { RoleGuard } from 'src/libs/guards/role.guard';
import { UserByAccessToken } from 'src/libs/strategies/jwt.strategy';
import { Role } from 'src/auth/entities/role';
import { BoardGameScoreService } from './board-game-score.service';
import { ApiPostBoardGameScoreReqBody } from './schemas/api-post-board-game-score-req-body.schema';
import { ApiPostBoardGameScoreResData } from './schemas/api-post-board-game-score-res-data.schema';

@ApiTags(SwaggerTag.BoardGameScore)
@ApiBearerAuth()
@Controller('board-game-score')
export class BoardGameScoreController {
  constructor(private readonly boardGameScoreService: BoardGameScoreService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiPostBoardGameScoreResData) },
  })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  async create(
    @Req() req: Request,
    @Body() body: ApiPostBoardGameScoreReqBody,
  ): Promise<ApiPostBoardGameScoreResData> {
    const { id: userId } = req.user as UserByAccessToken;
    const boardGameScore = await this.boardGameScoreService.create(
      userId,
      body.boardGameScore,
    );
    const averageScore = await this.boardGameScoreService.getAverageScoreById(
      boardGameScore.boardGameId,
    );
    return { boardGameScore, averageScore };
  }
}
