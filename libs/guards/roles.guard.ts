import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { ROLES_KEY } from 'libs/decorators/role.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/entities/role';
import { UserByAccessToken } from 'libs/strategies/jwt.strategy';

@Injectable()
export class RolesGuard implements CanActivate {
  logger = new Logger('RolesGuard');
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const user = context.switchToHttp().getRequest()
      .user as UserByAccessToken | null;

    if (!user) return false;

    return requiredRoles.includes(user.role);
  }
}
