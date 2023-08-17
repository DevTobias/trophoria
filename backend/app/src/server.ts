import { bootstrap } from '$infrastructure/webserver';
import { authRoutes } from '$interface/routes/auth.route';

const { setup, startup } = bootstrap();
setup.use(authRoutes).listen(startup);
