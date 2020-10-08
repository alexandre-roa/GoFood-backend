import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListRestaurantWithSelectedCategoryService from '@modules/restaurants/services/ListRestaurantWithSelectedCategoryService';

export default class SelectedRestaurantCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { name } = request.query;

    const category_name = name[0];
    const listSelectedRestaurantCategory = container.resolve(
      ListRestaurantWithSelectedCategoryService,
    );

    const restaurant = await listSelectedRestaurantCategory.execute({
      category_name,
      user_id,
    });

    return response.json(classToClass(restaurant));
  }
}
