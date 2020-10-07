import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserSessionsController from '../controllers/UserSessionsController';

const sessionsRouter = Router();
const userSessionsController = new UserSessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userSessionsController.create,
);

export default sessionsRouter;
