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

export const bootstrap = () => {
  const env = loadEnvironment();
  const db = createDatabaseConnection(env.DATABASE_URL);

  Container.set({ id: DATABASE, value: db, dependencies: [] });
  Container.set({ id: ENVIRONMENT, value: env, dependencies: [] });

  const app = new Elysia()
    .decorate('env', env)
    .decorate('db', db)
    .decorate('resolve', <T>(identifier: ServiceIdentifier<T>) => Container.get(identifier))
    .use(logger())
    .use(cookie())
    .use(cors())
    .use(helmet())
    .use(errorHandler());

  return { server: app, startup: { port: env.PORT, hostname: env.HOST } };
};
