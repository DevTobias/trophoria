import { Service } from '@freshgum/typedi';

import { AuthService } from '$application/use_cases/auth/_auth.service';
import { AuthDatabaseService } from '$application/use_cases/auth/auth.database.service';
import { SignInInterface, SignUpInterface } from '$domain/auth.interface';
import { mapUser } from '$domain/mappings/user.mapper';
import { Handler } from '$infrastructure/webserver';

@Service([AuthDatabaseService])
export class AuthController {
  constructor(private authService: AuthService) {}

  signUp: Handler<SignUpInterface> = async ({ body }) => {
    return mapUser(await this.authService.signUp(body));
  };

  signIn: Handler<SignInInterface> = async ({ user, cookie, setCookie }) => {
    const { accessToken, refreshToken } = await this.authService.signIn(user!, cookie.REFRESH);
    setCookie('REFRESH', `${refreshToken}`);
    return { accessToken, refreshToken, user: mapUser(user!) };
  };

  signOut: Handler<unknown> = async ({ user, setCookie }) => {
    setCookie('REFRESH', '', { expires: new Date('Thu, Jan 01 1970 00:00:00 UTC') });
    return this.authService.signOut(user!.id);
  };

  refreshToken: Handler<unknown> = async ({ user, setCookie }) => {
    const { accessToken, refreshToken } = await this.authService.refreshToken(user!);
    setCookie('REFRESH', refreshToken);
    return { accessToken, refreshToken, user: mapUser(user!) };
  };
}
