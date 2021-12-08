import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
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
  UseGuards,
} from '@nestjs/common';

import { AdminUserService } from './admin-user.service';
import { SwaggerTag } from 'libs/constants';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { RolesGuard } from 'libs/guards/roles.guard';
import { Roles } from 'libs/decorators/role.decorator';
import { Role } from 'src/auth/entities/role';
import { ApiExpiredTokenResponse } from 'libs/decorators/api-expired-token-response.decorator';
import { ApiGetAdminUserListResData } from './schemas/api-get-admin-user-list-res-data.schema';
import { ApiPatchAdminUserIdResData } from './schemas/api-patch-admin-user-id-res-data.schema';
import { ApiPatchAdminUserIdReqBody } from './schemas/api-patch-admin-user-id-req-body.schema';
import { ApiDeleteAdminUserIdResData } from './schemas/api-delete-admin-user-id-res-data.schema';

@ApiTags(SwaggerTag.AdminUser)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiUnauthorizedResponse()
@ApiExpiredTokenResponse()
@ApiForbiddenResponse()
@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get('list')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiGetAdminUserListResData) },
  })
  async getUserList(
    @Query('rowsPerPage', ParseIntPipe) rowsPerPage: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('keyword') keyword: string,
  ) {
    const users = await this.adminUserService.findAllByPageAndRowsPerPage(
      +page,
      +rowsPerPage,
      keyword,
    );
    const totalCount = await this.adminUserService.getAllCount(keyword);
    return { users, totalCount };
  }

  @Patch(':id')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiPatchAdminUserIdResData) },
  })
  @ApiNotFoundResponse(AdminUserService.ErrorNotFound.toApiResponseOptions())
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ApiPatchAdminUserIdReqBody,
  ): Promise<ApiPatchAdminUserIdResData> {
    const user = await this.adminUserService.updateProfile(id, body.user);
    return { user };
  }

  @Delete(':id')
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiDeleteAdminUserIdResData) },
  })
  @ApiNotFoundResponse(AdminUserService.ErrorNotFound.toApiResponseOptions())
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiDeleteAdminUserIdResData> {
    const user = await this.adminUserService.delete(+id);
    return { user };
  }
}
