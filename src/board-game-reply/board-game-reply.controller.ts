import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request } from 'express';
import { SwaggerTag } from 'src/libs/constants';
import { ApiExpiredTokenResponse } from 'src/libs/decorators/api-expired-token-response.decorator';
import { ApiForbiddenResponse } from 'src/libs/decorators/api-forbidden-response.decorator';
import { Roles } from 'src/libs/decorators/role.decorator';
import { JwtAuthGuard } from 'src/libs/guards/jwt-auth.guard';
import { RoleGuard } from 'src/libs/guards/role.guard';
import { ErrorCode } from 'src/libs/http-exceptions/error-codes';
import { UserByAccessToken } from 'src/libs/strategies/jwt.strategy';
import { Role } from 'src/auth/entities/role';
import { BoardGameReplyService } from './board-game-reply.service';
import { ApiDeleteBoardGameReplyIdResData } from './vo/api-delete-board-game-reply-id-res-data.schema';
import { ApiPatchBoardGameReplyResData } from './vo/api-patch-board-game-reply-id-res-data.schema';
import { ApiPostBoardGameReplyReqBody } from './vo/api-post-board-game-reply-req-body.schema';
import { ApiPostBoardGameReplyResData } from './vo/api-post-board-game-reply-res-data.schema';
import { ApiUnauthorizedResponse } from 'src/libs/decorators/api-unauthorized-response.decorator';

@ApiTags(SwaggerTag.BoardGameReply)
@ApiBearerAuth()
@Controller('board-game-reply')
export class BoardGameReplyController {
  constructor(private readonly boardGameReplyService: BoardGameReplyService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiPostBoardGameReplyResData) },
  })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  async create(
    @Req() req: Request,
    @Body() body: ApiPostBoardGameReplyReqBody,
  ): Promise<ApiPostBoardGameReplyResData> {
    const { id } = req.user as UserByAccessToken;
    const boardGameReply = await this.boardGameReplyService.create(
      id,
      body.boardGameReply,
    );
    return { boardGameReply };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiPatchBoardGameReplyResData) },
  })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse(ErrorCode.NoPermission)
  @ApiNotFoundResponse(
    BoardGameReplyService.ErrorNotFoundBoardGame.toApiResponseOptions(),
  )
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body: ApiPostBoardGameReplyReqBody,
  ): Promise<ApiPatchBoardGameReplyResData> {
    const { id: userId } = req.user as UserByAccessToken;
    const boardGameReply = await this.boardGameReplyService.update(
      +id,
      userId,
      body.boardGameReply,
    );
    return { boardGameReply };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiDeleteBoardGameReplyIdResData) },
  })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse(ErrorCode.NoPermission)
  @ApiNotFoundResponse(
    BoardGameReplyService.ErrorNotFoundBoardGame.toApiResponseOptions(),
  )
  async remove(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<ApiDeleteBoardGameReplyIdResData> {
    const { id: userId } = req.user as UserByAccessToken;
    const boardGameReply = await this.boardGameReplyService.remove(+id, userId);
    return { boardGameReply };
  }
}
