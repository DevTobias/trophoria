import { Service } from '@freshgum/typedi';

import { UserService } from '$application/use_cases/user/_user.service';
import { Database, users } from '$database';
import { CreateUserInterface } from '$domain/interface/user.interface';
import { DATABASE } from '$infrastructure/webserver';
import { HTTP, httpException } from '$infrastructure/webserver/types';

@Service([DATABASE])
export class UserDatabaseService implements UserService {
  constructor(private db: Database) {}

  create = async (payload: CreateUserInterface) => {
    const insertUser = await this.db
      .insert(users)
      .values(payload)
      .returning()
      .catch(() => httpException('user with this email or username already exists', HTTP.CONFLICT));
    return insertUser[0];
  };
}
