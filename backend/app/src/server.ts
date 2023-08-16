import { users } from '$database/schema/users';
import { bootstrap } from '$infrastructure/webserver';
import { HttpException } from '$infrastructure/webserver/types';

const { server, startup } = bootstrap();
export const app = server
  .get('/ping', () => {
    throw new HttpException('Hello World', 200);
  })
  .get('/', ({ db }) => {
    return db.select().from(users).execute();
  })
  .listen(startup);
