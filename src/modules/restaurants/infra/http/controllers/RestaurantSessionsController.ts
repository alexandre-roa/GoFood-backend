import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateRestaurantService from '@modules/restaurants/services/AuthenticateRestaurantService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateRestaurant = container.resolve(
      AuthenticateRestaurantService,
    );

    const { restaurant, token } = await authenticateRestaurant.execute({
      email,
      password,
    });

    return response.json({ restaurant: classToClass(restaurant), token });
  }
}
