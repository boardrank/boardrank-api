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
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SwaggerTag } from 'libs/constants';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { RolesGuard } from 'libs/guards/roles.guard';
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
import { ApiPatchUserIdResData } from './schemas/api-patch-user-id-res-data.schema';
import { ApiPatchUserIdReqBody } from './schemas/api-patch-user-id-req-body.schema';
import { ApiDeleteUserIdResData } from './schemas/api-delete-user-id-res-data.schema';
import { ApiGetUserListResData } from './schemas/api-get-user-list-res-data.schema';
import { ApiExpiredTokenResponse } from 'libs/decorators/api-expired-token-response.decorator';

@ApiTags(SwaggerTag.User)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Get('list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiGetUserListResData) } })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse()
  async getUserList(
    @Query('rowsPerPage', ParseIntPipe) rowsPerPage: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('keyword') keyword: string,
  ) {
    const users = await this.userService.findAllByPageAndRowsPerPage(
      +page,
      +rowsPerPage,
      keyword,
    );
    const totalCount = await this.userService.getAllCount();
    return { users, totalCount };
  }

  @Get(':id')
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiGetUserIdResData) } })
  @ApiNotFoundResponse(UserService.ErrorNotFound.toApiResponseOptions())
  async getProfile(@Param('id') id: string): Promise<ApiGetUserIdResData> {
    const user = await this.userService.findOneById(+id);
    return { user };
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
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
    const { id, role } = req.user as UserByAccessToken;
    const user = await this.userService.updateProfile(
      id,
      body.user,
      role === Role.ADMIN,
    );
    return { user };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiPatchUserIdResData) } })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(UserService.ErrorNotFound.toApiResponseOptions())
  async updateProfile(
    @Param('id') id: string,
    @Body() body: ApiPatchUserIdReqBody,
  ): Promise<ApiPatchUserIdResData> {
    const user = await this.userService.updateProfile(+id, body.user, true);
    return { user };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiDeleteUserIdResData) } })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(UserService.ErrorNotFound.toApiResponseOptions())
  async deleteUser(@Param('id') id: string): Promise<ApiDeleteUserIdResData> {
    const user = await this.userService.delete(+id);
    return { user };
  }
}
