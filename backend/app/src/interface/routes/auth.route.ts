import Elysia from 'elysia';

import { signUpSchema } from '$domain/auth.interface';
import { Setup, resolve } from '$infrastructure/webserver';
import { AuthController } from '$interface/controller/auth.controller';

export const authRoutes = (setup: Setup) => {
  const authController = resolve(AuthController);
  return new Elysia({ prefix: '/auth' }).use(setup).post('/signup', authController.signUp, { body: signUpSchema });
};
