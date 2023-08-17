import { cookie as cookiePlugin } from '@elysiajs/cookie';
import Elysia from 'elysia';

export const cookie = (isDev: boolean) => {
  return new Elysia({ name: 'elysia-cookie' }).use(
    cookiePlugin({ httpOnly: true, sameSite: 'none', secure: !isDev, maxAge: 60 * 60 * 24 * 30, path: '/' })
  );
};
