import { Service } from '@freshgum/typedi';
import { and, eq, ne, or, sql } from 'drizzle-orm';

import { UserService } from '$application/use_cases/user/_user.service';
import { Database, users } from '$database';
import { first, onUndefined } from '$database/extension';
import { CreateUserInterface } from '$domain/interface/user.interface';
import { DATABASE } from '$infrastructure/webserver';
import { HTTP, httpException } from '$infrastructure/webserver/types';

@Service([DATABASE])
export class UserDatabaseService implements UserService {
  constructor(private db: Database) {}

  create = async (payload: CreateUserInterface) => {
    return first(this.db.insert(users).values(payload), () =>
      httpException('user with this email or username already exists', HTTP.CONFLICT)
    );
  };

  findById = async (id: string) => {
    return onUndefined(this.db.query.users.findFirst({ where: eq(users.id, id) }), () =>
      httpException('user with this id does not exist', HTTP.NOT_FOUND)
    );
  };

  findByEmailOrUsername = async (identifier: string) => {
    return onUndefined(
      this.db.query.users.findFirst({ where: or(eq(users.email, identifier), eq(users.username, identifier)) }),
      () => httpException('user with this id does not exist', HTTP.NOT_FOUND)
    );
  };

  findByToken = async (refreshToken: string) => {
    return onUndefined(this.db.query.users.findFirst({ where: sql`${refreshToken} = ANY(tokens)` }), () =>
      httpException('provided invalid token', HTTP.NOT_FOUND)
    );
  };

  persistTokens = async (id: string, tokens: string[]) => {
    const tokenFilter = `{${tokens.map((token) => `${token}`).join(',')}}`;
    const alreadyAssigned = await this.db.query.users.findFirst({
      where: and(ne(users.id, id), sql`"users"."tokens" && ${tokenFilter}`),
    });

    if (alreadyAssigned) httpException('token already assigned', HTTP.BAD_REQUEST);

    return first(this.db.update(users).set({ tokens }).where(eq(users.id, id)));
  };
}
