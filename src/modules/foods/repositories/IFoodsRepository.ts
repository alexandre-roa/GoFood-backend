import Food from '@modules/foods/infra/typeorm/schemas/Food';
import ICreateFoodDTO from '../dtos/ICreateFoodDTO';

export default interface IFoodsRepository {
  create(data: ICreateFoodDTO): Promise<Food>;
  find(): Promise<Food[]>;
  findOneFood(food_name: string): Promise<Food | undefined>;
  delete(ids: Array<string>): Promise<void>;
}
