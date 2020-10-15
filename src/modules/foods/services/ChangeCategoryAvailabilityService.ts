import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryFoodsRepository from '@modules/foods/repositories/ICategoryFoodsRepository';

@injectable()
class ChangeCategoryAvailability {
  constructor(
    @inject('FoodCategoryRepository')
    private foodCategoryRepository: ICategoryFoodsRepository,
  ) {}

  public async execute(
    category_id: string,
    availability: boolean,
  ): Promise<void> {
    const category = await this.foodCategoryRepository.findId(category_id);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    category.available = availability;

    await this.foodCategoryRepository.save(category);
  }
}

export default ChangeCategoryAvailability;
