import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      category_name: Joi.string().required(),
    },
  }),
  categoriesController.create,
);

export default categoriesRouter;
