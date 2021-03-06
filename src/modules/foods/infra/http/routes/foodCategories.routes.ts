import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FoodCategoryController from '../controllers/FoodCategoryController';
import SelectedCategoryController from '../controllers/SelectedCategoryController';
import CategoryAvailabilityController from '../controllers/CategoryAvailabilityController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const foodCategoriesRouter = Router();

const foodCategoryController = new FoodCategoryController();
const selectedCategoryController = new SelectedCategoryController();
const categoryAvailabilityController = new CategoryAvailabilityController();

foodCategoriesRouter.use(ensureAuthenticated);

foodCategoriesRouter.patch(
  '/:category_id/availability',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().id().required(),
    },
    [Segments.BODY]: {
      availability: Joi.boolean().required(),
    },
  }),
  categoryAvailabilityController.update,
);

foodCategoriesRouter.post(
  '/:restaurant_id/create_category',
  celebrate({
    [Segments.PARAMS]: {
      restaurant_id: Joi.string().id().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      image_url: Joi.string().allow(null, ''),
    },
  }),
  foodCategoryController.create,
);

foodCategoriesRouter.get(
  '/:restaurant_id/categories',
  celebrate({
    [Segments.PARAMS]: {
      restaurant_id: Joi.string().id().required(),
    },
  }),
  foodCategoryController.index,
);

foodCategoriesRouter.get(
  '/:restaurant_id/category/:category_id',
  celebrate({
    [Segments.PARAMS]: {
      restaurant_id: Joi.string().id().required(),
      category_id: Joi.string().id().required(),
    },
  }),
  selectedCategoryController.index,
);

foodCategoriesRouter.delete(
  '/category/:category_id',
  celebrate({
    [Segments.PARAMS]: {
      category_id: Joi.string().id().required(),
    },
  }),
  selectedCategoryController.delete,
);

export default foodCategoriesRouter;
