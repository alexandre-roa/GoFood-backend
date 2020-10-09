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

  public async execute(restaurant_id: string): Promise<FoodCategory[]> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    const restaurantId = JSON.stringify(restaurant.id).replace(/"/g, '');

    const categories = await this.foodCategoryRepository.find(restaurantId);

    return categories;
  }
}

export default GetAllCategories;
