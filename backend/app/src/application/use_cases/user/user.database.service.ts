import { Service } from '@freshgum/typedi';
import { and, eq, ne, or, sql } from 'drizzle-orm';

import { UserService } from '$application/use_cases/user/_user.service';
import { CreateUser, Database, user } from '$database';
import { DATABASE } from '$infrastructure/webserver';
import { HTTP, httpException } from '$infrastructure/webserver/types';
import { first } from '$lib/utils/promise';

@Service([DATABASE])
export class UserDatabaseService implements UserService {
  constructor(private db: Database) {}

  create = async (payload: CreateUser) => {
    return first(this.db.insert(user).values(payload).returning(), () =>
      httpException('user with this email or username already exists', HTTP.CONFLICT)
    );
  };

  findById = async (id: string) => {
    return first(this.db.select().from(user).where(eq(user.id, id)), () =>
      httpException('user with this id does not exist', HTTP.NOT_FOUND)
    );
  };

  findByEmailOrUsername = async (identifier: string) => {
    const emailOrUsernameQuery = or(eq(user.email, identifier), eq(user.username, identifier));
    return first(this.db.select().from(user).where(emailOrUsernameQuery), () =>
      httpException('user with this identifier does not exist', HTTP.NOT_FOUND)
    );
  };

  findByToken = async (refreshToken: string) => {
    const assignedUserQuery = sql`${refreshToken} = ANY(tokens)`;
    return first(this.db.select().from(user).where(assignedUserQuery), () =>
      httpException('provided invalid token', HTTP.NOT_FOUND)
    );
  };

  persistTokens = async (id: string, tokens: string[]) => {
    const tokenFilter = `{${tokens.map((token) => `${token}`).join(',')}}`;

    const tokenExistsQuery = and(ne(user.id, id), sql`${user.tokens} && ${tokenFilter}`);
    const alreadyAssigned = await this.db.select().from(user).where(tokenExistsQuery);

    if (alreadyAssigned.length > 0) httpException('token already assigned', HTTP.BAD_REQUEST);

    return first(this.db.update(user).set({ tokens }).returning().where(eq(user.id, id)));
  };
}
