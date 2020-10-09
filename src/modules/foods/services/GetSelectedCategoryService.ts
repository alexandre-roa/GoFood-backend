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
    categoryTitle,
    restaurant_id: string,
  ): Promise<FoodCategory> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    const restaurantId = JSON.stringify(restaurant.id).replace(/"/g, '');

    const category = await this.foodCategoryRepository.findOne(
      categoryTitle,
      restaurantId,
    );

    if (!category) throw new AppError('Category not found');

    return category;
  }
}

export default GetSelectedCategoryService;
