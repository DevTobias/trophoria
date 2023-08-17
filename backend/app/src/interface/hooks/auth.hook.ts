import { Service } from '@freshgum/typedi';

import { AuthService } from '$application/use_cases/auth/_auth.service';
import { AuthDatabaseService } from '$application/use_cases/auth/auth.database.service';
import { SignInInterface } from '$domain/auth.interface';
import { Guard } from '$infrastructure/webserver';

@Service([AuthDatabaseService])
export class AuthHooks {
  constructor(private authService: AuthService) {}

  localAuthHook: Guard<SignInInterface> = async (ctx) => {
    ctx.user = await this.authService.getAuthenticatedUser(ctx.body.identifier, ctx.body.password);
  };
}
