import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { INVALID_TOKEN } from '../const/auth.excption-message';

@Injectable()
export class BearerTokenGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        // {authorization} : 'Basic asdlkfjqwlekrjklqwejr'}
        // 을 split하면 따로 뗄 수 있다.
        const rawToken = req.headers.authorization;

        if (!rawToken) {
            throw new UnauthorizedException(INVALID_TOKEN);
        }
        const token = await this.authService.extractToken(rawToken, false);

        const result = await this.authService.verifyToken(token);
        
        req.token = token;
        req.tokenType = result.type;
        req.userId = result.id;

        return true;
    }
}