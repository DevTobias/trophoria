import { bootstrap } from '$infrastructure/webserver';
import { HttpException } from '$infrastructure/webserver/types';

const { server, startup } = bootstrap();
export const app = server
  .get('/ping', () => {
    throw new HttpException('Hello World', 200);
  })
  .get('/', () => {
    return 'Hello World';
  })
  .listen(startup);
