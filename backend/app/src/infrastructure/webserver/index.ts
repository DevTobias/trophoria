import cookie from '@elysiajs/cookie';
import { Container, ServiceIdentifier, Token } from '@freshgum/typedi';
import Elysia from 'elysia';

import { createDatabaseConnection, Database } from '$database';
import { Environment, loadEnvironment } from '$infrastructure/config';
import { errorHandler } from '$infrastructure/webserver/handler/error.handler';
import { cors } from '$infrastructure/webserver/plugins/cors';
import { helmet } from '$infrastructure/webserver/plugins/helmet';
import { logger } from '$infrastructure/webserver/plugins/logger';

export const DATABASE = new Token<Database>();
export const ENVIRONMENT = new Token<Environment>();

export const resolve = <T>(identifier: ServiceIdentifier<T>) => Container.get(identifier);

export const bootstrap = () => {
  const env = loadEnvironment();
  const db = createDatabaseConnection(env.DATABASE_URL);

  Container.set({ id: DATABASE, value: db, dependencies: [] });
  Container.set({ id: ENVIRONMENT, value: env, dependencies: [] });

  const setup = new Elysia()
    .decorate('env', env)
    .decorate('db', db)
    .use(logger())
    .use(cookie())
    .use(cors())
    .use(helmet())
    .use(errorHandler());

  return { setup, startup: { port: env.PORT, hostname: env.HOST } };
};

export type Setup = ReturnType<typeof bootstrap>['setup'];
export type Handler<T> = (
  ctx: Parameters<Parameters<ReturnType<typeof bootstrap>['setup']['get']>[1]>[0] & { body: T }
) => Response | Promise<Response>;
