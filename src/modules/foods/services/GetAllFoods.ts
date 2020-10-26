// import { FoodCategory } from '@modules/foods/infra/typeorm/schemas/FoodCategory';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFoodsRepository from '@modules/foods/repositories/IFoodsRepository';
import ICategoryFoodsRepository from '@modules/foods/repositories/ICategoryFoodsRepository';
import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import Food from '../infra/typeorm/schemas/Food';

// interface IFoodsByCategory {
//   foods: Food[],
//   category: FoodCategory
// }

@injectable()
class GetAllFoods {
  constructor(
    @inject('FoodsRepository')
    private foodsRepository: IFoodsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('FoodCategoryRepository')
    private foodCategoryRepository: ICategoryFoodsRepository,
  ) {}

  public async execute(
    restaurant_id: string,
    category_id: string,
  ): Promise<any> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);
    const category = await this.foodCategoryRepository.findById(category_id);

    const allFoods = await this.foodsRepository.find(restaurant, category);

    return { ...category, foods: allFoods };
  }
}

export default GetAllFoods;
