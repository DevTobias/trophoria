import { Service } from '@freshgum/typedi';

import { UserDatabaseService } from '$application/use_cases/user/user.database.service';
import { mapUser } from '$domain/mappings/user.mapper';
import { Handler } from '$infrastructure/webserver';

@Service([UserDatabaseService])
export class UserController {
  static getUser: Handler<unknown> = async ({ user }) => {
    return mapUser(user!);
  };
}
