import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryFoodsRepository from '@modules/foods/repositories/ICategoryFoodsRepository';
import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import FoodCategory from '../infra/typeorm/schemas/FoodCategory';

@injectable()
class GetSelectedCategoryService {
  constructor(
    @inject('FoodCategoryRepository')
    private foodCategoryRepository: ICategoryFoodsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(
    category_id: string,
    restaurant_id: string,
  ): Promise<FoodCategory> {
    const category = await this.foodCategoryRepository.findById(category_id);

    if (!category) throw new AppError('Category not found');

    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) throw new AppError('Restaurant not found');

    return { ...category, restaurant };
  }
}

export default GetSelectedCategoryService;
