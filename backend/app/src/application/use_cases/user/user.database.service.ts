import { Service } from '@freshgum/typedi';
import { and, eq, ne, or, sql } from 'drizzle-orm';

import { UserService } from '$application/use_cases/user/_user.service';
import { CreateUser, Database, user } from '$database';
import { DATABASE } from '$infrastructure/webserver';
import { HTTP, httpException } from '$infrastructure/webserver/types';
import { first, onUndefined } from '$lib/utils/promise';

@Service([DATABASE])
export class UserDatabaseService implements UserService {
  constructor(private db: Database) {}

  create = async (payload: CreateUser) => {
    return first(this.db.insert(user).values(payload).returning(), () =>
      httpException('user with this email or username already exists', HTTP.CONFLICT)
    );
  };

  findById = async (id: string) => {
    return onUndefined(this.db.query.user.findFirst({ where: eq(user.id, id) }), () =>
      httpException('user with this id does not exist', HTTP.NOT_FOUND)
    );
  };

  findByEmailOrUsername = async (identifier: string) => {
    return onUndefined(
      this.db.query.user.findFirst({ where: or(eq(user.email, identifier), eq(user.username, identifier)) }),
      () => httpException('user with this identifier does not exist', HTTP.NOT_FOUND)
    );
  };

  findByToken = async (refreshToken: string) => {
    return onUndefined(this.db.query.user.findFirst({ where: sql`${refreshToken} = ANY(tokens)` }), () =>
      httpException('provided invalid token', HTTP.NOT_FOUND)
    );
  };

  persistTokens = async (id: string, tokens: string[]) => {
    const tokenFilter = `{${tokens.map((token) => `${token}`).join(',')}}`;
    const alreadyAssigned = await this.db.query.user.findFirst({
      where: and(ne(user.id, id), sql`${user.tokens} && ${tokenFilter}`),
    });

    if (alreadyAssigned) httpException('token already assigned', HTTP.BAD_REQUEST);

    return first(this.db.update(user).set({ tokens }).returning().where(eq(user.id, id)));
  };
}
