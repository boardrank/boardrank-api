import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLES_KEY } from 'libs/decorators/role.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/entities/role';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';

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

    if (!user) return false;

    const { role } = await this.prismaService.user.findUnique({
      select: {
        role: true,
      },
      where: {
        id: user.id,
      },
    });

    return requiredRoles.includes(role as Role);
  }
}
