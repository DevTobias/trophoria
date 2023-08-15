import cookie from '@elysiajs/cookie';
import Elysia from 'elysia';

import { loadEnvironment } from '$infrastructure/config';
import { errorHandler } from '$infrastructure/webserver/handler/error.handler';
import { cors } from '$infrastructure/webserver/plugins/cors';
import { helmet } from '$infrastructure/webserver/plugins/helmet';
import { logger } from '$infrastructure/webserver/plugins/logger';

export const bootstrap = () => {
  const env = loadEnvironment();

  const app = new Elysia()
    .decorate('env', env)
    .use(logger())
    .use(cookie())
    .use(cors())
    .use(helmet())
    .use(errorHandler());

  return { server: app, startup: { port: env.PORT, hostname: env.HOST } };
};
