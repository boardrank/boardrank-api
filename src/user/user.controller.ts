import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SwaggerTag } from 'libs/constants';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'libs/guards/jwt-auth.guard';
import { RolesGuard } from 'libs/guards/roles.guard';
import { Roles } from 'libs/decorators/role.decorator';
import { Role } from 'src/auth/entities/role';
import { Request } from 'express';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';
import { ApiUnauthorizedResponse } from 'libs/decorators/api-unauthorized-response.decorator';
import { User } from './entities/user.entity';

@ApiTags(SwaggerTag.User)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(User) },
  })
  @ApiUnauthorizedResponse()
  async getOwnProfile(@Req() req: Request) {
    const { id } = req.user as UserByAccessToken;
    return await this.userService.findOneById(id);
  }
}
