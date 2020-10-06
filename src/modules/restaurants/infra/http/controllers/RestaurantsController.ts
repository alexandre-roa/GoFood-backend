import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRestaurantService from '@modules/restaurants/services/CreateRestaurantService';

export default class RestaurantsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createRestaurant = container.resolve(CreateRestaurantService);

    const restaurant = await createRestaurant.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(restaurant));
  }
}
