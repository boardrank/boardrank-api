import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SwaggerTag } from 'libs/constants';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { RoleGuard } from 'libs/guards/role.guard';
import { Roles } from 'libs/decorators/role.decorator';
import { Role } from 'src/auth/entities/role';
import { Request } from 'express';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';
import { ApiUnauthorizedResponse } from 'libs/decorators/api-unauthorized-response.decorator';
import { ApiForbiddenResponse } from 'libs/decorators/api-forbidden-response.decorator';
import { ApiGetUserResData } from './schemas/api-get-user-res-data.schema';
import { ApiPatchUserResData } from './schemas/api-patch-user-res-data.schema';
import { ApiPatchUserReqBody } from './schemas/api-patch-user-req-body.schema';
import { ApiGetUserIdResData } from './schemas/api-get-user-id-res-data.schema';
import { ApiExpiredTokenResponse } from 'libs/decorators/api-expired-token-response.decorator';

@ApiTags(SwaggerTag.User)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiGetUserResData) } })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(UserService.ErrorNotFound.toApiResponseOptions())
  async getOwnProfile(@Req() req: Request): Promise<ApiGetUserResData> {
    const { id } = req.user as UserByAccessToken;
    const user = await this.userService.findOneById(id);
    return { user };
  }

  @Get(':id')
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiGetUserIdResData) } })
  @ApiNotFoundResponse(UserService.ErrorNotFound.toApiResponseOptions())
  async getProfile(@Param('id') id: string): Promise<ApiGetUserIdResData> {
    const user = await this.userService.findOneById(+id);
    return { user };
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiPatchUserResData) } })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(UserService.ErrorNotFound.toApiResponseOptions())
  async updateOwnProfile(
    @Req() req: Request,
    @Body() body: ApiPatchUserReqBody,
  ): Promise<ApiPatchUserResData> {
    const { id } = req.user as UserByAccessToken;
    const user = await this.userService.updateProfile(id, body.user);
    return { user };
  }
}
