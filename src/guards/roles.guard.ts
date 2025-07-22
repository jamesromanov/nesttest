import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles';
import { Request } from 'express';
import { UserRole } from 'src/enums/user.role';
import { CustomRequest } from 'src/types/request';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRole = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRole) return true;

      const { user } = context.switchToHttp().getRequest<CustomRequest>();
      if (!user) throw new UnauthorizedException();
      if (!requiredRole.includes(user?.role))
        throw new UnauthorizedException('You dont have right to do that');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
}
