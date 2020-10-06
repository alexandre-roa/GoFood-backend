import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import restaurantsRouter from '@modules/restaurants/infra/http/routes/restaurants.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/restaurants', restaurantsRouter);
routes.use('/session', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
