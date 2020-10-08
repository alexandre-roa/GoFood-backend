import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateFoodService from '@modules/foods/services/CreateFoodService';

export default class FoodsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const { title, description, price, image_url, extras } = request.body;

    const createFood = container.resolve(CreateFoodService);

    const food = await createFood.execute({
      title,
      description,
      price,
      image_url,
      extras,
      category_id,
    });

    return response.json(food);
  }
}
