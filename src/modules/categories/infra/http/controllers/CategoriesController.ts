import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import ListAllCategoriesService from '@modules/categories/services/ListAllCategoriesService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { category_name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      category_name,
    });

    return response.json(classToClass(category));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListAllCategoriesService);

    const categories = await listCategories.execute();

    return response.json(categories);
  }
}
