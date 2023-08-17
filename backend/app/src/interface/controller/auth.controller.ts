import { Service } from '@freshgum/typedi';

import { AuthService } from '$application/use_cases/auth/_auth.service';
import { AuthDatabaseService } from '$application/use_cases/auth/auth.database.service';
import { SignUpInterface } from '$domain/auth.interface';
import { mapUser } from '$domain/mappings/user.mapper';
import { Handler } from '$infrastructure/webserver';
import { HttpResponse } from '$infrastructure/webserver/types';

@Service([AuthDatabaseService])
export class AuthController {
  constructor(private authService: AuthService) {}

  signUp: Handler<SignUpInterface> = async ({ body }) => {
    return HttpResponse(mapUser(await this.authService.signUp(body)));
  };
}
