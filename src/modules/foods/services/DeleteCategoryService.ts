import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryFoodsRepository from '@modules/foods/repositories/ICategoryFoodsRepository';
import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import FoodCategory from '../infra/typeorm/schemas/FoodCategory';

@injectable()
class GetAllCategories {
  constructor(
    @inject('FoodCategoryRepository')
    private foodCategoryRepository: ICategoryFoodsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(category_id: string): Promise<void> {
    await this.foodCategoryRepository.delete(category_id);
  }
}

export default GetAllCategories;
