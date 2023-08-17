import Elysia from 'elysia';

import { signInSchema, signUpSchema } from '$domain/auth.interface';
import { Setup, resolve } from '$infrastructure/webserver';
import { AuthController } from '$interface/controller/auth.controller';
import { AuthHooks } from '$interface/hooks/auth.hook';

export const authRoutes = (setup: Setup) => {
  const authController = resolve(AuthController);
  const authHooks = resolve(AuthHooks);

  return new Elysia({ prefix: '/auth' })
    .use(setup)
    .post('/signup', authController.signUp, { body: signUpSchema })
    .post('/signin', authController.signIn, { body: signInSchema, beforeHandle: authHooks.localAuthHook });
};
