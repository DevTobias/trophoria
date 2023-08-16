import { UserDatabaseService } from '$application/use_cases/user/user.database.service';
import { bootstrap } from '$infrastructure/webserver';
import { httpException } from '$infrastructure/webserver/types';

const { server, startup } = bootstrap();
export const app = server
  .get('/ping', () => httpException('Hello World', 200))
  .get('/', ({ resolve }) =>
    resolve(UserDatabaseService).create({ email: 'test@gmx.de', password: 'test4', username: 'test1' })
  )
  .listen(startup);
