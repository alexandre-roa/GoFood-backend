import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RestaurantsController from '../controllers/RestaurantsController';
import SelectedRestaurantCategoryController from '../controllers/SelectedRestaurantCategoryController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const restaurantsRouter = Router();
const restaurantsController = new RestaurantsController();
const selectedRestaurantCategoryController = new SelectedRestaurantCategoryController();

restaurantsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      restaurant_category: Joi.string().required(),
    },
  }),
  restaurantsController.create,
);

restaurantsRouter.use(ensureAuthenticated);

restaurantsRouter.get('/', restaurantsController.index);

restaurantsRouter.get(
  '/:user_id/selected_category',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().id().required(),
    },
  }),
  selectedRestaurantCategoryController.index,
);

export default restaurantsRouter;
