import { signInSchema, signUpSchema } from '$domain/auth.interface';
import { App, SetupHandler, resolve } from '$infrastructure/webserver';
import { AuthController } from '$interface/controller/auth.controller';
import { AuthHooks } from '$interface/hooks/auth.hook';

export const authRoutes = (setup: SetupHandler) => (app: App) => {
  const authController = resolve(AuthController);
  const authHooks = resolve(AuthHooks);

  return app.use(setup).group('/auth', (group) => {
    return group
      .post('/signup', authController.signUp, { body: signUpSchema })
      .post('/signin', authController.signIn, { body: signInSchema, beforeHandle: authHooks.localAuth })
      .post('/signout', authController.signOut, { beforeHandle: authHooks.tokenAuth })
      .post('/refresh', authController.refreshToken, { beforeHandle: authHooks.refreshAuth });
  });
};
