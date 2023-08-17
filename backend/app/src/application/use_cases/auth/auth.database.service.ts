import { Service } from '@freshgum/typedi';

import { AuthService } from '$application/use_cases/auth/_auth.service';
import { UserService } from '$application/use_cases/user/_user.service';
import { UserDatabaseService } from '$application/use_cases/user/user.database.service';
import { PasswordHash } from '$application/utils/password.utils';
import { SignUpInterface } from '$domain/auth.interface';

@Service([UserDatabaseService])
export class AuthDatabaseService implements AuthService {
  constructor(private userService: UserService) {}

  signUp = async (payload: SignUpInterface) => {
    const password = await PasswordHash.hash(payload.password);
    return this.userService.create({ ...payload, password });
  };
}
