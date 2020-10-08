import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FoodsController from '../controllers/FoodsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const foodsRouter = Router();

const foodsController = new FoodsController();

foodsRouter.use(ensureAuthenticated);

foodsRouter.post(
  '/:category_id/',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().id().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      image_url: Joi.string(),
      extras: Joi.array(),
    },
  }),
  foodsController.create,
);

export default foodsRouter;
