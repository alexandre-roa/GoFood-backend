import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRestaurantService from '@modules/restaurants/services/CreateRestaurantService';
import ListRestaurantsService from '@modules/restaurants/services/ListRestaurantsService';

export default class RestaurantsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, restaurant_category } = request.body;

    const createRestaurant = container.resolve(CreateRestaurantService);

    const restaurant = await createRestaurant.execute({
      name,
      email,
      password,
      restaurant_category,
    });

    return response.json(classToClass(restaurant));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listRestaurants = container.resolve(ListRestaurantsService);

    const restaurants = await listRestaurants.execute();

    return response.json(classToClass(restaurants));
  }
}
