import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import userSessionsRouter from '@modules/users/infra/http/routes/userSessions.routes';
import userPasswordRouter from '@modules/users/infra/http/routes/userPassword.routes';

import restaurantsRouter from '@modules/restaurants/infra/http/routes/restaurants.routes';
import restaurantSessionsRouter from '@modules/restaurants/infra/http/routes/restaurantSessions.routes';
import restaurantPasswordRouter from '@modules/restaurants/infra/http/routes/restaurantPassword.routes';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/user/session', userSessionsRouter);
routes.use('/user/password', userPasswordRouter);

routes.use('/restaurants', restaurantsRouter);
routes.use('/restaurant/session', restaurantSessionsRouter);
routes.use('/restaurant/password', restaurantPasswordRouter);

routes.use('/categories', categoriesRouter);

export default routes;
