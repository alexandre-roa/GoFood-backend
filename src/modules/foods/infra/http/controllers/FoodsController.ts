import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFoodService from '@modules/foods/services/CreateFoodService';
import DeleteFoodService from '@modules/foods/services/DeleteFoodService';
import GetFoods from '@modules/foods/services/GetAllFoods';

export default class FoodsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { category_id, restaurant_id } = request.params;
    const { title, description, price, image_url, extras } = request.body;

    const createFood = container.resolve(CreateFoodService);

    const food = await createFood.execute({
      title,
      description,
      price,
      image_url,
      extras,
      category_id,
      restaurant_id,
    });

    return response.json(classToClass(food));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const getFoods = container.resolve(GetFoods);

    const foods = await getFoods.execute(restaurant_id);

    return response.json(foods);
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { food_id } = request.params;

    const deleteFood = container.resolve(DeleteFoodService);

    await deleteFood.execute(food_id);

    response.status(200).json({ message: 'Food deleted' });
  }
}
