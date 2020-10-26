import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetSelectedCategoryService from '@modules/foods/services/GetSelectedCategoryService';
import DeleteCategoryService from '@modules/foods/services/DeleteCategoryService';

export default class SelectedCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { restaurant_id, category_id } = request.params;

    const getCategories = container.resolve(GetSelectedCategoryService);

    const foods = await getCategories.execute(category_id, restaurant_id);

    return response.json(classToClass(foods));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const categories = container.resolve(DeleteCategoryService);

    await categories.execute(category_id);

    return response.json('Deleted selected category');
  }
}
