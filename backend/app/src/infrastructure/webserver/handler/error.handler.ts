import Elysia from 'elysia';

import { HttpException, HttpResponse } from '$infrastructure/webserver/types';

export const errorHandler = () => {
  return new Elysia({ name: 'error-handler' }).onError(({ code, error }) => {
    if (code === 'NOT_FOUND') return HttpResponse({ msg: 'endpoint not found' }, { status: 404 });

    if (error instanceof HttpException) {
      return HttpResponse({ msg: error.message }, { status: error.code });
    }

    return HttpResponse({ msg: error.message }, { status: 500 });
  });
};
