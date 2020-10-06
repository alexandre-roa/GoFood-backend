import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RestaurantsController from '../controllers/RestaurantsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const restaurantsRouter = Router();
const restaurantsController = new RestaurantsController();

restaurantsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  restaurantsController.create,
);

export default restaurantsRouter;
