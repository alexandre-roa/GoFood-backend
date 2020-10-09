import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFoodCategoryService from '@modules/foods/services/CreateFoodCategoryService';
import GetSelectedCategoryService from '@modules/foods/services/GetSelectedCategoryService';
// import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export default class SelectedCategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;
    const { category_title } = request.query;

    const getCategories = container.resolve(GetSelectedCategoryService);

    const title = category_title[0];

    const category = await getCategories.execute(title, restaurant_id);

    return response.json(category);
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { category_id } = request.params;
  //   const categories = container.resolve(DeleteCategoryService);

  //   await categories.delete(category_id);

  //   return response.json({
  //     delete: 'Deleted all transactions with this category',
  //   });
  // }
}
