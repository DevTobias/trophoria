import '$lib/utils/array';

import { bootstrap } from '$infrastructure/webserver';
import { authRoutes } from '$interface/routes/auth.route';
import { userRoutes } from '$interface/routes/user.route';

const { app, setup, startup } = bootstrap();
app.use(authRoutes(setup)).use(userRoutes(setup)).listen(startup);
