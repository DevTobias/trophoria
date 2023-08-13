import cookie from '@elysiajs/cookie';
import Elysia from 'elysia';

import { loadEnvironment } from '$infrastructure/config';
import { errorHandler } from '$infrastructure/webserver/handler/error.handler';
import { logger } from '$infrastructure/webserver/plugins/logger';

export const bootstrap = () => {
  const env = loadEnvironment();
  const app = new Elysia().decorate('env', env).use(cookie()).use(logger()).use(errorHandler());
  return { server: app, startup: { port: env.PORT, hostname: env.HOST } };
};
