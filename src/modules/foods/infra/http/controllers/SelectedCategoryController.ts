import { Response, Request } from 'express';
import { container } from 'tsyringe';

import GetSelectedCategoryService from '@modules/foods/services/GetSelectedCategoryService';
import DeleteCategoryService from '@modules/foods/services/DeleteCategoryService';

export default class SelectedCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;
    const { category_title } = request.query;

    const getCategories = container.resolve(GetSelectedCategoryService);

    const title = category_title[0];

    const category = await getCategories.execute(title, restaurant_id);

    return response.json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const categories = container.resolve(DeleteCategoryService);

    await categories.execute(category_id);

    return response.json('Deleted selected category');
  }
}
