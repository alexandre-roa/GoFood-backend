import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import userSessionsRouter from '@modules/users/infra/http/routes/userSessions.routes';

import restaurantsRouter from '@modules/restaurants/infra/http/routes/restaurants.routes';
import restaurantSessionsRouter from '@modules/restaurants/infra/http/routes/restaurantSessions.routes';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/restaurants', restaurantsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/user/session', userSessionsRouter);
routes.use('/restaurants/session', restaurantSessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
