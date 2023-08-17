import { Container, ServiceIdentifier, Token } from '@freshgum/typedi';
import Elysia from 'elysia';

import { createDatabaseConnection, Database, User } from '$database';
import { Environment, loadEnvironment } from '$infrastructure/config';
import { errorHandler } from '$infrastructure/webserver/handler/error.handler';
import { cookie } from '$infrastructure/webserver/plugins/cookie';
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

  const app = new Elysia();

  const setup = app
    .decorate('env', env)
    .decorate('db', db)
    .decorate('user', null as User | null)
    .use(cookie(env.IS_DEV))
    .use(logger())
    .use(cors())
    .use(helmet())
    .use(errorHandler());

  return { app, setup: () => setup, startup: { port: env.PORT, hostname: env.HOST } };
};

export type Setup = ReturnType<ReturnType<typeof bootstrap>['setup']>;
export type SetupHandler = () => Setup;
export type App = Elysia;

export type Handler<T> = (
  ctx: Parameters<Parameters<Setup['get']>[1]>[0] & { body: T }
) => Response | Promise<Response> | object | string;

export type Guard<T> = (ctx: Parameters<Parameters<Setup['get']>[1]>[0] & { body: T }) => void;
