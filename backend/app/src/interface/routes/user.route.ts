import { App, SetupHandler, resolve } from '$infrastructure/webserver';
import { UserController } from '$interface/controller/user.controller';
import { AuthHooks } from '$interface/hooks/auth.hook';

export const userRoutes = (setup: SetupHandler) => (app: App) => {
  const authHooks = resolve(AuthHooks);

  return app.use(setup).group('/user', (group) => {
    return group.get('/', UserController.getUser, {
      beforeHandle: authHooks.tokenAuth,
    });
  });
};
