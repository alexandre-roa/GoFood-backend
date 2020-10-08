import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FoodCategoryController from '../controllers/FoodCategoryController';

const foodCategories = Router();

const foodCategoryController = new FoodCategoryController();

foodCategories.post(
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

export default foodCategories;
