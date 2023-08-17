import { Service } from '@freshgum/typedi';

import { AuthService } from '$application/use_cases/auth/_auth.service';
import { AuthDatabaseService } from '$application/use_cases/auth/auth.database.service';
import { UserService } from '$application/use_cases/user/_user.service';
import { UserDatabaseService } from '$application/use_cases/user/user.database.service';
import { AuthToken } from '$application/utils/token.utils';
import { SignInInterface } from '$domain/auth.interface';
import { Guard } from '$infrastructure/webserver';
import { HTTP, httpException } from '$infrastructure/webserver/types';

@Service([AuthDatabaseService, UserDatabaseService])
export class AuthHooks {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  localAuth: Guard<SignInInterface> = async (ctx) => {
    ctx.user = await this.authService.getAuthenticatedUser(ctx.body.identifier, ctx.body.password);
  };

  tokenAuth: Guard<unknown> = async (ctx) => {
    const authHeader = ctx.headers.authorization;
    if (!authHeader) httpException('no authentication header provided', HTTP.UNAUTHORIZED);
    const accessToken = authHeader!.split(' ')[1];

    try {
      const { jti } = (await AuthToken.verify(accessToken, ctx.env.JWT_PUBLIC_KEY)).payload;
      if (!jti) httpException('no valid auth token', HTTP.UNAUTHORIZED);
      ctx.user = await this.userService.findById(jti!);
    } catch (_) {
      httpException('no valid auth token', HTTP.UNAUTHORIZED);
    }
  };

  refreshAuth: Guard<unknown> = async (ctx) => {
    const refreshToken = ctx.cookie.REFRESH;
    if (!refreshToken) httpException('invalid refresh token', HTTP.UNAUTHORIZED);
    ctx.user = await this.authService.verifyRefreshToken(refreshToken);
  };
}
