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
import { RolesGuard } from 'libs/guards/roles.guard';
import { Roles } from 'libs/decorators/role.decorator';
import { Role } from 'src/auth/entities/role';
import { Request } from 'express';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';
import { ApiUnauthorizedResponse } from 'libs/decorators/api-unauthorized-response.decorator';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiForbiddenResponse } from 'libs/decorators/api-forbidden-response.decorator';

@ApiTags(SwaggerTag.User)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(User) } })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse({
    description: UserService.ErrorNotFound.toDescription(),
  })
  async getOwnProfile(@Req() req: Request) {
    const { id } = req.user as UserByAccessToken;
    return await this.userService.findOneById(id);
  }

  @Get(':id')
  @ApiOkResponse({ schema: { $ref: getSchemaPath(User) } })
  @ApiNotFoundResponse({
    description: UserService.ErrorNotFound.toDescription(),
  })
  async getProfile(@Param('id') id: string) {
    return await this.userService.findOneById(+id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(User) } })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse({
    description: UserService.ErrorNotFound.toDescription(),
  })
  async updateOwnProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { id, role } = req.user as UserByAccessToken;
    return await this.userService.updateProfile(
      id,
      updateUserDto,
      role === Role.ADMIN,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(User) } })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse({
    description: UserService.ErrorNotFound.toDescription(),
  })
  async updateProfile(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateProfile(+id, updateUserDto, true);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(User) } })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse({
    description: UserService.ErrorNotFound.toDescription(),
  })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(+id);
  }
}
