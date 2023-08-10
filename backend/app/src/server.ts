import path from 'node:path';

import { App } from '$infrastructure/webserver';

export const app = App({
  root: path.resolve(import.meta.dir, '..'),
  plugins: () => [],
  routes: () => [],
}).listen();
