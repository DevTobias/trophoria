import { setHelmetHeaders, HelmetOptions } from '@modules/elysia-helmet';
import Elysia from 'elysia';

export const helmet = (options: Readonly<HelmetOptions> = {}) => {
  return new Elysia({ name: 'elysia-helmet' }).on('request', ({ set }) => {
    setHelmetHeaders(
      ([name, value]) => (set.headers[name] = value),
      (name) => delete set.headers[name],
      options
    );
  });
};
