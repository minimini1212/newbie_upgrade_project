import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { INVALID_TOKEN } from '../const/auth.excption-message';

@Injectable()
export class BearerGuard implements CanActivate {
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

        const { email, password } = this.authService.decodeBasicToken(token);

        const user = await this.authService.authenticate({
            email,
            password,
        });
        req.user = user;

        return true;
    }
}