import { UserDatabaseService } from '$application/use_cases/user/user.database.service';
import { bootstrap } from '$infrastructure/webserver';
import { httpException } from '$infrastructure/webserver/types';

const { server, startup } = bootstrap();
export const app = server
  .get('/ping', () => httpException('Hello World', 200))
  .get(
    '/',
    ({ resolve }) => resolve(UserDatabaseService).persistTokens('bb28755d-2f07-4b7d-b8b0-86e381120d69', ['1234']) // ({ email: 'test2@gmx.de', password: 'test4', username: 'test2' })
  )
  .listen(startup);
