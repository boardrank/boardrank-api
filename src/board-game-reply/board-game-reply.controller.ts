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
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request } from 'express';
import { SwaggerTag } from 'libs/constants';
import { ApiForbiddenResponse } from 'libs/decorators/api-forbidden-response.decorator';
import { Roles } from 'libs/decorators/role.decorator';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { RolesGuard } from 'libs/guards/roles.guard';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';
import { Role } from 'src/auth/entities/role';
import { BoardGameReplyService } from './board-game-reply.service';
import { CreateBoardGameReplyDto } from './dto/create-board-game-reply.dto';
import { UpdateBoardGameReplyDto } from './dto/update-board-game-reply.dto';
import { BoardGameReply } from './entities/board-game-reply.entity';

@ApiTags(SwaggerTag.BoardGameReply)
@ApiBearerAuth()
@Controller('board-game-reply')
export class BoardGameReplyController {
  constructor(private readonly boardGameReplyService: BoardGameReplyService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(BoardGameReply) },
  })
  @ApiUnauthorizedResponse()
  async create(
    @Req() req: Request,
    @Body() createBoardGameReplyDto: CreateBoardGameReplyDto,
  ) {
    const { id } = req.user as UserByAccessToken;
    return await this.boardGameReplyService.create(id, createBoardGameReplyDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(BoardGameReply) },
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(
    BoardGameReplyService.ErrorNotFoundBoardGame.toApiResponseOptions(),
  )
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateBoardGameReplyDto: UpdateBoardGameReplyDto,
  ) {
    const { id: userId } = req.user as UserByAccessToken;
    return this.boardGameReplyService.update(
      +id,
      userId,
      updateBoardGameReplyDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(BoardGameReply) },
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(
    BoardGameReplyService.ErrorNotFoundBoardGame.toApiResponseOptions(),
  )
  remove(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as UserByAccessToken;
    return this.boardGameReplyService.remove(+id, user);
  }
}
