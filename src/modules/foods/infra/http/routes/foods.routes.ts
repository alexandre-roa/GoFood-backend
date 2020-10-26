import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FoodsController from '../controllers/FoodsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const foodsRouter = Router();

const foodsController = new FoodsController();

foodsRouter.use(ensureAuthenticated);

foodsRouter.post(
  '/:category_id/:restaurant_id',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().id().required(),
      restaurant_id: Joi.string().id().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      image_url: Joi.string().allow(null, ''),
      extras: Joi.array(),
    },
  }),
  foodsController.create,
);

foodsRouter.get(
  '/:restaurant_id/category_food/:category_id',
  celebrate({
    [Segments.PARAMS]: {
      restaurant_id: Joi.string().id().required(),
      category_id: Joi.string().id().required(),
    },
  }),
  foodsController.index,
);

foodsRouter.delete('/:food_id', foodsController.delete);

export default foodsRouter;
