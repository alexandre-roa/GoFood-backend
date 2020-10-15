import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFoodCategoryService from '@modules/foods/services/CreateFoodCategoryService';
import ChangeCategoryAvailabilityService from '@modules/foods/services/ChangeCategoryAvailabilityService';

export default class CategoryAvailabilityController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const { availability } = request.body;

    const createCategory = container.resolve(ChangeCategoryAvailabilityService);

    const category = await createCategory.execute(category_id, availability);

    return response.json(classToClass(category));
  }
}
