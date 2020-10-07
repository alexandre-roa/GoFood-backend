import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import userSessionsRouter from '@modules/users/infra/http/routes/userSessions.routes';

import restaurantsRouter from '@modules/restaurants/infra/http/routes/restaurants.routes';
import restaurantSessionsRouter from '@modules/restaurants/infra/http/routes/restaurantSessions.routes';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import userPasswordRouter from '@modules/users/infra/http/routes/userPassword.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/user/session', userSessionsRouter);
routes.use('/user/password', userPasswordRouter);

routes.use('/restaurants', restaurantsRouter);
routes.use('/restaurants/session', restaurantSessionsRouter);

routes.use('/categories', categoriesRouter);

export default routes;
