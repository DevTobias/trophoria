import Elysia from 'elysia';

import { HttpException } from '$infrastructure/webserver/types';

export const errorHandler = () => {
  return new Elysia({ name: 'error-handler' }).onError(({ set, code, error }) => {
    if (code === 'NOT_FOUND') {
      set.status = 404;
      return { msg: 'endpoint not found', status: 404 };
    }

    if (error instanceof HttpException) {
      set.status = error.code;
      return { msg: error.message, status: error.code };
    }

    set.status = 500;
    return { msg: error.message, status: 500 };
  });
};
