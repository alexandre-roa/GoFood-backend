import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FoodCategoryController from '../controllers/FoodCategoryController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const foodCategoriesRouter = Router();

const foodCategoryController = new FoodCategoryController();

foodCategoriesRouter.use(ensureAuthenticated);

foodCategoriesRouter.post(
  '/:restaurant_id/create_category',
  celebrate({
    [Segments.PARAMS]: {
      restaurant_id: Joi.string().id().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
  }),
  foodCategoryController.create,
);

export default foodCategoriesRouter;
