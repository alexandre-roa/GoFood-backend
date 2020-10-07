import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { category_name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      category_name,
    });

    return response.json(classToClass(category));
  }
}
