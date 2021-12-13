import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ROLES_KEY } from 'libs/decorators/role.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/entities/role';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';
import { ApiNoPermissionErrorResponse } from 'libs/http-exceptions/api-no-permission-error-response';

@Injectable()
export class RoleGuard implements CanActivate {
  logger = new Logger('RolesGuard');
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const user = context.switchToHttp().getRequest()
      .user as UserByAccessToken | null;

    if (!user) throw new UnauthorizedException();

    const { role } = await this.prismaService.user.findUnique({
      select: {
        role: true,
      },
      where: {
        id: user.id,
      },
    });

    if (!requiredRoles.includes(role as Role))
      throw new ApiNoPermissionErrorResponse('권한이 없습니다.');

    return true;
  }
}
