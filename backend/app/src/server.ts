import { App } from '$infrastructure/webserver';

export const app = App({
  plugins: () => [],
  routes: () => [],
}).listen();
