import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CategoriesController from '../controllers/CategoriesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', categoriesController.index);

export default categoriesRouter;
