import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies['authorization'];
    if (!token) throw new UnauthorizedException('No active session.');

    try {
      const decodedToken = await this.authService.verify(token);
      if (!decodedToken) throw new UnauthorizedException('Invalid authorization token.');
      request.user = decodedToken;

      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid authorization token.');
    }
  }
}
