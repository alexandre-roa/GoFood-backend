import Food from '@modules/foods/infra/typeorm/schemas/Food';
import FoodCategory from '../infra/typeorm/schemas/FoodCategory';
import Restaurant from '@modules/restaurants/infra/typeorm/schemas/Restaurant';
import ICreateFoodDTO from '../dtos/ICreateFoodDTO';

export default interface IFoodsRepository {
  create(data: ICreateFoodDTO): Promise<Food>;
  find(restaurant: Restaurant, category: FoodCategory): Promise<Food[]>;
  findOneFood(food_name: string): Promise<Food | undefined>;
  delete(id: string): Promise<void>;
}
