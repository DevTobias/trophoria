import Elysia from 'elysia';
import pino from 'pino';

export const logger = () => {
  const instance = pino();
  return new Elysia({ name: 'elysia-logger' })
    .decorate('log', instance)
    .on('request', ({ log, request }) => {
      log.info({
        route: `[${request.method}]`.padEnd(8) + new URL(request.url).pathname,
        ...(request.body && { body: request.body }),
        ...(request.headers && { headers: request.headers }),
      });
    })
    .on('error', ({ error, request }) => {
      instance.error({
        route: `[${request.method}]`.padEnd(8) + new URL(request.url).pathname,
        ...('code' in error && { code: error.code }),
        message: error.message,
        ...(error.stack && { stack: error.stack }),
      });
    });
};
