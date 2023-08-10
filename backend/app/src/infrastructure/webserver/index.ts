import Elysia from 'elysia';
import { pino } from 'pino';

import { loadEnvironment } from '$infrastructure/config';

export const App = (init: { plugins: () => Elysia[]; routes: () => Elysia[]; root: string }) => {
  const env = loadEnvironment(`${init.root}/.env`);

  const app = new Elysia();
  const logger = pino();

  app.decorate('log', logger);

  const listen = async () => {
    app.listen({ port: env.PORT, hostname: env.HOST }, ({ hostname, port }) => {
      logger.info({ msg: `🦊 Elysia is running at ${hostname}:${port}` });
    });

    return app;
  };

  return { app, env, listen };
};
