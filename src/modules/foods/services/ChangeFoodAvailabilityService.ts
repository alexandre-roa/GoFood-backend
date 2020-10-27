import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryFoodsRepository from '@modules/foods/repositories/ICategoryFoodsRepository';

@injectable()
class ChangeFoodAvailability {
  constructor(
    @inject('FoodsRepository')
    private foodsRepository: ICategoryFoodsRepository,
  ) {}

  public async execute(food_id: string, availability: boolean): Promise<void> {
    const food = await this.foodsRepository.findById(food_id);

    if (!food) {
      throw new AppError('Food not found.', 404);
    }

    await this.foodsRepository.save({ ...food, available: availability });
  }
}

export default ChangeFoodAvailability;
