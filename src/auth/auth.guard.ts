import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly log = new Logger('AuthGuard');
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      await clerkClient.verifyToken(request.cookies.__session);
    } catch (error: any) {
      this.log.error(error.message);
      return false;
    }
    return true;
  }
}
