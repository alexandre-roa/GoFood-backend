import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ChangeFoodAvailabilityService from '@modules/foods/services/ChangeFoodAvailabilityService';

export default class CategoryAvailabilityController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { food_id } = request.params;
    const { availability } = request.body;

    const updateFood = container.resolve(ChangeFoodAvailabilityService);

    const food = await updateFood.execute(food_id, availability);

    return response.json(classToClass(food));
  }
}
