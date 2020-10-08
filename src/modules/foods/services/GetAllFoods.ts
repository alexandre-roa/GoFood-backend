import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFoodsRepository from '@modules/foods/repositories/IFoodsRepository';
import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import Food from '../infra/typeorm/schemas/Food';

@injectable()
class GetAllFoods {
  constructor(
    @inject('FoodsRepository')
    private foodsRepository: IFoodsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(restaurant_id: string): Promise<Food[]> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    const foods = await this.foodsRepository.find(restaurant);

    return foods;
  }
}

export default GetAllFoods;
