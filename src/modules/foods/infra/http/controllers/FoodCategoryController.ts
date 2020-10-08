import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateFoodCategoryService from '@modules/foods/services/CreateFoodCategoryService';
// import GetCategoryService from '@modules/categories/services/GetCategoryService';
// import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export default class FoodCategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;
    const { title } = request.body;

    const createCategory = container.resolve(CreateFoodCategoryService);

    const category = await createCategory.execute({ title, restaurant_id });

    return response.json(category);
  }

  // public async index(request: Request, response: Response): Promise<Response> {
  //   const getCategories = container.resolve(GetCategoryService);

  //   const categories = await getCategories.find();

  //   return response.json(categories);
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { category_id } = request.params;
  //   const categories = container.resolve(DeleteCategoryService);

  //   await categories.delete(category_id);

  //   return response.json({
  //     delete: 'Deleted all transactions with this category',
  //   });
  // }
}
