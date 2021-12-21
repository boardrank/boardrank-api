import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SwaggerTag } from 'src/libs/constants';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/libs/guards/jwt-auth.guard';
import { RoleGuard } from 'src/libs/guards/role.guard';
import { Roles } from 'src/libs/decorators/role.decorator';
import { Role } from 'src/auth/entities/role';
import { Request } from 'express';
import { UserByAccessToken } from 'src/libs/strategies/jwt.strategy';
import { ApiUnauthorizedResponse } from 'src/libs/decorators/api-unauthorized-response.decorator';
import { ApiForbiddenResponse } from 'src/libs/decorators/api-forbidden-response.decorator';
import { ApiGetUserResData } from './schemas/api-get-user-res-data.schema';
import { ApiPatchUserResData } from './schemas/api-patch-user-res-data.schema';
import { ApiPatchUserReqBody } from './schemas/api-patch-user-req-body.schema';
import { ApiGetUserIdResData } from './schemas/api-get-user-id-res-data.schema';
import { ApiExpiredTokenResponse } from 'src/libs/decorators/api-expired-token-response.decorator';
import { ErrorCode } from 'src/libs/http-exceptions/error-codes';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiForbiddenResponse(ErrorCode.NoPermission)
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
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    schema: {
      $ref: getSchemaPath(ApiPatchUserReqBody),
      type: 'object',
      properties: {
        user: { $ref: getSchemaPath(UpdateUserDto) },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiPatchUserResData) } })
  @ApiUnauthorizedResponse()
  @ApiExpiredTokenResponse()
  @ApiForbiddenResponse(ErrorCode.NoPermission)
  @ApiNotFoundResponse(UserService.ErrorNotFound.toApiResponseOptions())
  async updateOwnProfile(
    @Req() req: Request,
    @Body() body: ApiPatchUserReqBody,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ApiPatchUserResData> {
    const { id } = req.user as UserByAccessToken;
    const newUser =
      req.headers['content-type'] === 'application/json'
        ? body.user
        : JSON.parse(body.user as string);
    const user = await this.userService.updateProfile(id, newUser, file);
    return { user };
  }
}
