import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RestaurantSessionsController from '../controllers/RestaurantSessionsController';

const sessionsRouter = Router();
const restaurantSessionsController = new RestaurantSessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  restaurantSessionsController.create,
);

export default sessionsRouter;
